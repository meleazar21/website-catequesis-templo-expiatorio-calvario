# Sitio web — Catequesis Templo Expiatorio El Calvario

Portal informativo de la **Catequesis del Templo Expiatorio Arquidiocesano
Parroquia El Calvario**, Masaya, Nicaragua.

Es un sitio **estático**: no depende del sistema de gestión (Iter Catecheticum) ni de
ningún servidor. Eso es deliberado — el backend del sistema vive en el plan gratuito de
Render y **se duerme sin tráfico**, así que un visitante que llegara desde Google
esperaría casi un minuto. Aquí todo se sirve desde el CDN: carga instantánea.

---

## Cómo editar el contenido

El sitio trae un **panel de administración** (Decap CMS) que se usa de dos formas:

**En línea (los catequistas).** En **https://www.catequesis-templo-expiatorio-calvario.com/admin**
se entra con correo y contraseña; esa dirección lleva al panel, que vive en Netlify.
Las cuentas se crean por invitación desde Netlify (Identity → Invite users): llega un
correo, se elige la contraseña y listo. No hace falta cuenta de GitHub. Cada vez que se
guarda, el cambio se publica solo en uno o dos minutos. Los pasos para activarlo están en
`netlify.toml`.

**En esta computadora (el desarrollador).** Dos terminales, ambas en la carpeta del
proyecto:

```bash
npm run admin     # terminal 1 — el backend del panel (déjalo corriendo)
npm run dev       # terminal 2 — el sitio
```

Y se abre **http://localhost:5173/admin/**. No pide usuario ni contraseña: lo que se
guarda escribe directo en `content/` y se publica con un `git push`. **Antes, haz
`git pull`**: alguien puede haber guardado cambios en línea.

> **Dónde vive cada cosa.** El sitio público está en **Vercel**, con el dominio propio.
> **Netlify** solo aloja el panel, su inicio de sesión (Identity) y Git Gateway: cualquier
> otra página que se abra allí redirige al dominio propio, así no hay dos copias del sitio.
> Git Gateway está deprecado (Netlify solo le corrige fallos graves de seguridad), pero
> sigue funcionando.

### Qué se puede editar

| Sección del panel | Qué controla |
|---|---|
| **Inscripciones** | Si están abiertas o cerradas, fechas, requisitos, enlace del botón |
| **Cursos de catequesis** | Agregar, editar, quitar y reordenar cursos, con su cartel |
| **Horarios** | La tabla de días, horas y lugares |
| **Avisos** | Publicar avisos, destacarlos, quitarlos |
| **Próximas actividades** | Fechas del calendario de la comunidad |
| **Sacramentos** | Información, requisitos y fechas de cada sacramento |
| **Catequistas** | Nombre, cargo, reseña y fotografía |
| **Galería** | Subir y ordenar fotografías |
| **Configuración del sitio** | Nombre, lema, versículo, portada, bienvenida, misión, visión, contacto, mapa y redes |

### Fotografías y video

Se suben desde el panel; caen en `public/fotos/`. Antes de subirlas, **comprímelas**
(idealmente menos de 300 KB cada una) — el visitante las descarga con sus datos.

**La portada admite foto, video o ninguno de los dos** — sin nada sale un degradado azul
que también se ve bien. Con la fotografía basta; el video es un extra. Si subes video,
debe ir **sin audio, en bucle y pesar menos de 5 MB**, y conviene subir también la
fotografía: en teléfonos el video no se reproduce a propósito, y es la foto lo que se ve.
Detalles en `public/video/LEEME.txt`.

### Contenido provisional

Nada en este repositorio es información oficial verificada. Todo lo pendiente dice
`[CONTENIDO POR DEFINIR]`, y en pantalla aparece como una etiqueta ámbar
**CONTENIDO POR DEFINIR** — imposible que se publique por descuido sin notarlo. Basta
con escribir el dato real encima desde el panel.

---

## Editar el contenido desde el código

El panel es solo una interfaz sobre archivos JSON. Quien prefiera el editor puede
tocarlos directamente — no hay contenido escrito dentro de los componentes:

```
content/
├── site.json            ← nombre, portada, bienvenida, misión, visión, contacto, redes
├── inscripciones.json   ← estado, fechas, requisitos
├── horarios.json        ← tabla de horarios
├── cursos/*.json        ← un archivo por curso
├── catequistas/*.json   ← un archivo por catequista
├── sacramentos/*.json
├── avisos/*.json
├── eventos/*.json       ← próximas actividades
└── galeria/*.json
```

En las carpetas, **agregar un archivo agrega la tarjeta** y el campo `orden` decide en
qué posición sale. `src/data/site.ts` y `src/data/catechesis.ts` solo leen esos archivos
y les ponen tipos; ahí no se escribe contenido.

Si agregas o quitas un campo en el JSON, agrégalo o quítalo también en
`public/admin/config.yml`, o el panel no lo mostrará.

---

## Identidad visual

La paleta, el logo y la tipografía de cuerpo son **los mismos del sistema de gestión**,
para que la catequesis se vea igual en los dos sitios.

| | |
|---|---|
| Azul mariano | `#1e3a8a` (oscuro `#152a63`, profundo `#0e1c44`) |
| Dorado | `#c8a04a` — solo como acento |
| Verde sutil | `#4f7d63` — solo para estados positivos |
| Marfil | `#faf8f3` fondo · `#1d2433` texto |
| Títulos | Cormorant Garamond (serif) |
| Cuerpo | Manrope (autoalojada, mismo archivo que el sistema) |

Los colores se definen en `tailwind.config.js`; no hay colores sueltos en los componentes.

---

## Desarrollo

```bash
npm install
npm run dev       # http://localhost:5173
npm run admin     # backend del panel en local (otra terminal)
npm run build     # comprueba tipos y genera dist/
```

Para abrir el panel en local hay que levantar además `npm run admin` (ver más arriba).

> Este repositorio es **independiente** del sistema de gestión a propósito: Render
> redespliega el backend en cada push a su repo, y corregir un párrafo de esta web no
> debe poder tumbar el API.

---

## Publicación

- **Vercel** (`vercel.json`) — el sitio público, en https://www.catequesis-templo-expiatorio-calvario.com.
  `/admin` redirige al panel en Netlify.
- **Netlify** (`netlify.toml`) — solo el panel: https://admin-catequesis-templo-expiatorio.netlify.app/admin/

Cada `git push` a `master` (y cada cambio guardado en el panel) redespliega los dos.

---

## Estructura

```
content/             ← todo el contenido editable (lo que edita /admin)
public/
├── admin/           ← panel de administración (en línea en Netlify, o en local)
├── fotos/           ← imágenes subidas desde el panel
└── video/           ← video de la portada
src/
├── data/            ← lectores tipados de content/ (site.ts, catechesis.ts)
├── components/
│   ├── ui/          ← iconos SVG, animación de entrada, marcadores de foto
│   ├── Navbar.tsx      Hero.tsx        Welcome.tsx
│   ├── Courses.tsx     Schedules.tsx   Registration.tsx
│   ├── Catechists.tsx  Sacraments.tsx  Announcements.tsx
│   ├── Gallery.tsx     Contact.tsx     Footer.tsx
├── App.tsx
└── index.css
```

React 18 · TypeScript · Tailwind CSS · Vite · Decap CMS.
