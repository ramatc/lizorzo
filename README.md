# LIZORZO — Sitio oficial

Single-page estática (React + TypeScript + Vite + Tailwind CSS v4). Sin backend: todo el contenido vive en `src/data/`.

## Correr el proyecto

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # genera dist/
npm run preview   # sirve dist/ localmente
```

## Editar contenido

| Quiero…                         | Archivo                         |
| ------------------------------- | ------------------------------- |
| Agregar / cambiar una fecha     | `src/data/shows.ts`             |
| Sumar un lanzamiento            | `src/data/releases.ts` + portada en `src/assets/releases/` |
| Cambiar bio, mail, redes, textos| `src/data/artist.ts`            |
| Reemplazar fotos                | `src/assets/photos/` (y medidas en `artist.ts`) |

- **Fechas:** solo se muestran las de hoy en adelante, ordenadas solas. Fecha en formato `AAAA-MM-DD`, hora local del show. Sin `ticketUrl` no aparece botón de compra.
- **Último lanzamiento:** se elige solo, es el más reciente cuya `releaseDate` ya pasó. Un lanzamiento futuro no aparece hasta su día.
- **Fotos:** la del hero es `live-01-1800.webp` (desktop) y `live-01-960.webp` (mobile); el retrato B/N de "Sobre mí" es `portrait-bw-960.webp`. Si cambian las proporciones, actualizá `width`/`height`.

## Publicar en Vercel

1. Subí el repo a GitHub.
2. En vercel.com → **Add New → Project** → importá el repo.
3. Vercel detecta Vite solo (build `npm run build`, output `dist`). **Deploy.**

Cada push a `main` vuelve a publicar. Por CLI: `npm i -g vercel` y después `vercel --prod`.
