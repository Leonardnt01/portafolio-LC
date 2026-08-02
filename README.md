# Portafolio de Leonardo Condori

Portafolio personal para postular a perfiles Full Stack + Datos, creado con Astro, React y TypeScript.

## Comandos

```bash
npm install
npm run dev
npm run build
```

## Publicación

La URL pública debe estar vinculada a este repositorio y a su rama de producción. Antes de compartirla, comprueba que el título, el nombre, el perfil de GitHub y los enlaces visibles pertenecen a Leonardo Condori.

## Contenido por completar

- `TODO:` Añadir el enlace real de LinkedIn en `src/data/portfolio.ts`.
- `TODO:` Sustituir el CV provisional por un PDF final y añadir su enlace cuando exista.
- `TODO:` Completar el periodo académico real y métricas verificables de los proyectos.
- `TODO:` Añadir capturas propias solo cuando estén disponibles; mientras tanto las tarjetas muestran un marcador intencional.

## Estructura

- `src/components/`: componentes React de cada sección.
- `src/data/portfolio.ts`: proyectos, tecnologías, navegación y evidencia de cada caso.
- `src/styles/global.css`: sistema visual y responsive.
- `public/images/`: imágenes locales del portafolio.

Cada proyecto tiene su propia página estática en `/proyectos/[slug]/`, generada durante el build a partir de los datos centralizados.

Para añadir una sección, crea un componente en `src/components/` y agrégalo en
`src/components/PortfolioApp.tsx`. Para añadir proyectos o tecnologías, edita
únicamente `src/data/portfolio.ts`.
