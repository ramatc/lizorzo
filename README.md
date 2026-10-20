# LIZORZO · Sitio oficial

Sitio oficial de **LIZORZO**: lanzamientos, fechas de la gira, bio y contacto en una single-page estática, rápida y sin backend. Todo el contenido vive en `src/data/`, así que actualizar el sitio es editar un archivo.

![React](https://img.shields.io/badge/-React%2019-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat&logo=typescript&logoColor=fff)
![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat&logo=vite&logoColor=fff)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS%20v4-06B6D4?style=flat&logo=tailwindcss&logoColor=fff)
![Vercel](https://img.shields.io/badge/-Vercel-000000?style=flat&logo=vercel&logoColor=fff)

🔗 **Sitio:** [lizorzo.com](https://www.lizorzo.com/)

<img width="1283" height="1000" alt="image" src="https://github.com/user-attachments/assets/6b6706c2-336f-4ed1-974a-c0795626495f" />


---

## ✨ Qué incluye

- **Hero** con foto en vivo, optimizada por separado para desktop y mobile.
- **Último lanzamiento**, elegido automáticamente según la fecha de salida.
- **Discografía** con links a cada plataforma.
- **Fechas** de la gira: solo las próximas, ordenadas solas, con banderas por país y botón de entradas.
- **Sobre mí** con bio y retrato.
- **Easter egg «Archivo 925»**: escribí `9-2-5` en el teclado (o tocá tres veces el logo en mobile).
- **SEO y preview de links**: metadata, Open Graph, `sitemap.xml` y `robots.txt`.
- **Métricas** con Vercel Analytics y Speed Insights.

---

## 🧰 Stack

| Área      | Tecnología                       |
| --------- | -------------------------------- |
| UI        | React 19                         |
| Lenguaje  | TypeScript                       |
| Build     | Vite                             |
| Estilos   | Tailwind CSS v4                  |
| Íconos    | Lucide + country-flag-icons      |
| Calidad   | oxlint                           |
| Deploy    | Vercel (Analytics + Speed Insights) |

---

## 🚀 Cómo correrlo localmente

```bash
git clone https://github.com/ramatc/lizorzo.git
cd lizorzo
npm install
npm run dev
```

La app queda disponible en [http://localhost:5173](http://localhost:5173).

| Comando           | Qué hace                         |
| ----------------- | -------------------------------- |
| `npm run dev`     | Servidor de desarrollo           |
| `npm run build`   | Typecheck + build en `dist/`     |
| `npm run preview` | Sirve `dist/` localmente         |
| `npm run lint`    | Linter (oxlint)                  |

---

## ✏️ Editar contenido

| Quiero…                          | Archivo                                                    |
| -------------------------------- | ---------------------------------------------------------- |
| Agregar / cambiar una fecha      | `src/data/shows.ts`                                        |
| Sumar un lanzamiento             | `src/data/releases.ts` + portada en `src/assets/releases/` |
| Cambiar bio, mail, redes, textos | `src/data/artist.ts`                                       |
| Reemplazar fotos                 | `src/assets/photos/` (y medidas en `artist.ts`)            |

> [!TIP]
> **Fechas:** formato `AAAA-MM-DD`, hora local del show. Las pasadas se ocultan solas. Sin `ticketUrl` no aparece el botón de compra.

> [!NOTE]
> **Último lanzamiento:** es el más reciente cuya `releaseDate` ya pasó. Un lanzamiento futuro no aparece hasta su día.

> [!IMPORTANT]
> **Fotos:** el hero usa `live-01-1800.webp` (desktop) y `live-01-960.webp` (mobile); el retrato B/N de «Sobre mí» es `portrait-bw-960.webp`. Si cambian las proporciones, actualizá `width`/`height` en `artist.ts`.

---

## 📂 Estructura

```
lizorzo/
├── public/            # Favicon, imagen Open Graph, sitemap y robots
├── src/
│   ├── assets/        # Fotos y portadas de lanzamientos
│   ├── components/    # Secciones y piezas de la UI
│   ├── data/          # Contenido editable: artista, lanzamientos y fechas
│   ├── lib/           # Utilidades (fechas)
│   ├── App.tsx        # Composición de la página
│   └── main.tsx       # Entry point
├── index.html         # Metadata, SEO y Open Graph
└── vite.config.ts     # Configuración de Vite + Tailwind
```

## 📫 Créditos

Diseño y desarrollo por [Ramiro Tanquias](https://ramatc.vercel.app/) · [GitHub](https://github.com/ramatc)
