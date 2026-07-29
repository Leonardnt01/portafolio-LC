/**
 * Datos de GitHub obtenidos en tiempo de build (frontmatter de Astro).
 * No se ejecuta nada de esto en el navegador: el resultado viaja al HTML
 * ya resuelto y se refresca en cada despliegue.
 */

export interface GithubRepo {
  name: string;
  description: string | null;
  language: string | null;
  url: string;
  pushedAt: string;
}

export interface GithubLanguage {
  name: string;
  count: number;
  share: number;
}

export interface GithubProfile {
  login: string;
  name: string;
  bio: string | null;
  avatarUrl: string;
  url: string;
  publicRepos: number;
  languages: GithubLanguage[];
  repos: GithubRepo[];
}

const API = 'https://api.github.com';

function headers() {
  const token = import.meta.env.GITHUB_TOKEN;
  return {
    Accept: 'application/vnd.github+json',
    // Sin token son 60 peticiones/hora por IP; con token, 5000.
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

/**
 * Devuelve `null` si la API falla o no responde. Quien consume estos datos
 * debe ocultar la seccion en ese caso: preferimos no mostrar nada antes que
 * mostrar cifras inventadas, y un rate limit no debe tumbar el build.
 */
export async function fetchGithubProfile(user: string): Promise<GithubProfile | null> {
  try {
    const [profileRes, reposRes] = await Promise.all([
      fetch(`${API}/users/${user}`, { headers: headers() }),
      fetch(`${API}/users/${user}/repos?per_page=100&sort=pushed`, { headers: headers() }),
    ]);

    if (!profileRes.ok || !reposRes.ok) {
      console.warn(`[github] respuesta no OK (${profileRes.status}/${reposRes.status})`);
      return null;
    }

    const profile = await profileRes.json();
    const allRepos = (await reposRes.json()) as Array<{
      name: string;
      description: string | null;
      language: string | null;
      html_url: string;
      pushed_at: string;
      fork: boolean;
      archived: boolean;
      size: number;
    }>;

    // `size: 0` son repositorios vacios (creados pero sin codigo subido):
    // mostrarlos en el portafolio resta en vez de sumar.
    const owned = allRepos.filter((repo) => !repo.fork && !repo.archived && repo.size > 0);

    // Reparto de lenguajes: se calcula desde los repos porque el heatmap de
    // contribuciones no esta expuesto en la API publica de GitHub.
    const counts = new Map<string, number>();
    for (const repo of owned) {
      if (!repo.language) continue;
      counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
    }
    const totalWithLanguage = [...counts.values()].reduce((sum, value) => sum + value, 0);
    const languages: GithubLanguage[] = [...counts.entries()]
      .map(([name, count]) => ({
        name,
        count,
        share: totalWithLanguage ? Math.round((count / totalWithLanguage) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);

    return {
      login: profile.login,
      name: profile.name ?? profile.login,
      bio: profile.bio,
      avatarUrl: profile.avatar_url,
      url: profile.html_url,
      publicRepos: profile.public_repos,
      languages,
      // 5 para que quepa `proyecto_Python`, que respalda un proyecto destacado
      // pese a no ser de los mas recientes.
      repos: owned.slice(0, 5).map((repo) => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        url: repo.html_url,
        pushedAt: repo.pushed_at,
      })),
    };
  } catch (error) {
    console.warn('[github] no se pudieron obtener los datos:', error);
    return null;
  }
}
