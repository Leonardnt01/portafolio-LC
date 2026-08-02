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
export async function fetchGithubProfile(
  user: string,
  featuredRepositoryNames: readonly string[] = [],
): Promise<GithubProfile | null> {
  // La actividad de GitHub complementa el portafolio, pero nunca debe impedir
  // generar el sitio si la API o la red no responde.
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const [profileRes, reposRes] = await Promise.all([
      fetch(`${API}/users/${user}`, { headers: headers(), signal: controller.signal }),
      fetch(`${API}/users/${user}/repos?per_page=100&sort=pushed`, {
        headers: headers(),
        signal: controller.signal,
      }),
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

    const toGithubRepo = (repo: (typeof owned)[number]): GithubRepo => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      url: repo.html_url,
      pushedAt: repo.pushed_at,
    });
    const featured = featuredRepositoryNames
      .map((name) => owned.find((repo) => repo.name.toLowerCase() === name.toLowerCase()))
      .filter((repo): repo is (typeof owned)[number] => Boolean(repo));
    const remaining = owned.filter((repo) => !featured.some((item) => item.name === repo.name));

    return {
      login: profile.login,
      name: profile.name ?? profile.login,
      bio: profile.bio,
      avatarUrl: profile.avatar_url,
      url: profile.html_url,
      publicRepos: profile.public_repos,
      languages,
      // La evidencia de la portada primero; despues, actividad reciente.
      repos: [...featured, ...remaining].slice(0, 5).map(toGithubRepo),
    };
  } catch (error) {
    console.warn('[github] no se pudieron obtener los datos:', error);
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}
