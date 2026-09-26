# Sitio web — Catequesis Templo Expiatorio El Calvario

Portal informativo de la **Catequesis del Templo Expiatorio Arquidiocesano
Parroquia El Calvario**, Masaya, Nicaragua.

Es un sitio **estático**: no depende del sistema de gestión (Iter Catecheticum) ni de
ningún servidor. Eso es deliberado — el backend del sistema vive en el plan gratuito de
Render y **se duerme sin tráfico**, así que un visitante que llegara desde Google
esperaría casi un minuto. Aquí todo se sirve desde el CDN: carga instantánea.

---

## Cómo editar el contenido

El sitio trae un **panel de administración** que se usa **en esta computadora**, no en
línea: se edita en local, se revisa y se publica con un `git push`. Cada push redespliega
el sitio solo.

### Levantar el panel

Dos terminales, ambas en la carpeta del proyecto:

```bash
npm run admin     # terminal 1 — el backend del panel (déjalo corriendo)
npm run dev       # terminal 2 — el sitio
```

Y se abre **http://localhost:5173/admin/**. No pide usuario ni contraseña. Lo que se
guarda **escribe directo en `content/`**: no toca GitHub hasta que tú lo subas. Si
`npm run admin` no está corriendo, el panel intentará iniciar sesión y no podrá entrar —
ese es el síntoma de que falta levantar el proxy.

### Publicar los cambios

```bash
git add -A
git commit -m "Actualiza los horarios de catequesis"
git push
```

Conviene mirar antes `git status` o `git diff`, que es justo la ventaja de editar en
local: nada se publica sin que lo veas.

> **Por qué en local y no en línea.** Un panel en línea necesita un servicio de identidad.
> El de Netlify (Git Gateway) está **deprecado** —sigue funcionando donde ya está activado,
> pero Netlify solo le arregla fallos graves de seguridad— y las alternativas implican o un
> tercero custodiando un token con escritura sobre el repositorio, o montar una app OAuth
> propia. Editar en local no depende de nada de eso.
>
> **El build borra `/admin`**, así que el panel no llega al sitio publicado: allí solo
> enseñaría un inicio de sesión que no puede funcionar. Para ponerlo en línea algún día,
> hay que quitar el plugin `panelSoloEnLocal` de `vite.config.ts` y dar un `backend` de
> verdad en `public/admin/config.yml`, donde están anotadas las opciones.

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
qué posición sale. `src/data/site.ts` y `src/data/catequesis.ts` solo leen esos archivos
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

Sitio **estático**: sirve cualquier hosting que despliegue desde Git. Hay configuración
lista para los dos habituales y en ambos basta importar el repositorio y desplegar, sin
tocar ajustes:

- **Vercel** — `vercel.json`
- **Netlify** — `netlify.toml`

Cada `git push` a `master` redespliega.

---

## Estructura

```
content/             ← todo el contenido editable (lo que edita /admin)
public/
├── admin/           ← panel de administración (solo local; el build lo borra)
├── fotos/           ← imágenes subidas desde el panel
└── video/           ← video de la portada
src/
├── data/            ← lectores tipados de content/ (site.ts, catequesis.ts)
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
