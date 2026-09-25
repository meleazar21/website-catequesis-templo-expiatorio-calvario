# Sitio web — Catequesis Templo Expiatorio El Calvario

Portal informativo de la **Catequesis del Templo Expiatorio Arquidiocesano
Parroquia El Calvario**, Masaya, Nicaragua.

Es un sitio **estático**: no depende del sistema de gestión (Iter Catecheticum) ni de
ningún servidor. Eso es deliberado — el backend del sistema vive en el plan gratuito de
Render y **se duerme sin tráfico**, así que un visitante que llegara desde Google
esperaría casi un minuto. Aquí todo se sirve desde el CDN: carga instantánea.

---

## Cómo editar el contenido (sin tocar código)

El sitio trae un **panel de administración** en **`/admin`**. Se entra con correo y
contraseña, y desde ahí se edita todo el contenido y se suben fotos y videos. Cada
cambio guardado en el panel se publica solo: el sitio se reconstruye en un par de
minutos.

Lo que puede editar quien mantiene el sitio:

| Sección del panel | Qué controla |
|---|---|
| **Inscripciones** | Si están abiertas o cerradas, fechas, requisitos, enlace del botón |
| **Cursos de catequesis** | Agregar, editar, quitar y reordenar cursos |
| **Horarios** | La tabla de días, horas y lugares |
| **Avisos** | Publicar avisos, destacarlos, quitarlos |
| **Próximas actividades** | Fechas del calendario de la comunidad |
| **Sacramentos** | Información, requisitos y fechas de cada sacramento |
| **Catequistas** | Nombres, grupo, frase y fotografía |
| **Galería** | Subir y ordenar fotografías |
| **Configuración del sitio** | Nombre, lema, versículo, portada (video/foto), bienvenida, misión, visión, teléfono, correo, dirección, mapa y redes |

Los cambios quedan como **borrador** hasta que se pulsa *Publicar* (`editorial_workflow`),
así nada se publica a medio escribir.

### Dejar el panel funcionando

El panel usa **Decap CMS**, que guarda los cambios en este mismo repositorio. Necesita
un servicio de inicio de sesión, y viene configurado para el de **Netlify**, que es el
que no requiere montar nada aparte:

1. Netlify → *Add new site* → *Import from Git* → este repositorio.
   (`netlify.toml` ya trae el comando de build y la carpeta de publicación.)
2. *Site configuration* → **Identity** → *Enable Identity*.
3. *Identity* → *Registration* → **Invite only** — para que no se registre cualquiera.
4. *Identity* → *Services* → **Git Gateway** → *Enable*.
5. *Identity* → *Invite users* → el correo de quien va a mantener el sitio. Le llega una
   invitación, elige su contraseña y ya entra a `https://…/admin`.

> **Si el sitio se publica en Vercel** (`vercel.json` también está listo), el sitio se ve
> igual pero el panel **no** inicia sesión: Vercel no tiene Identity. Habría que crear una
> app OAuth de GitHub y un pequeño proxy; en `public/admin/config.yml` está el bloque
> `backend` alternativo ya escrito, comentado. Lo más simple es publicar en Netlify.

### Fotografías y video

Se suben desde el panel; caen en `public/fotos/`. Antes de subirlas, **comprímelas**
(idealmente menos de 300 KB cada una) — el visitante las descarga con sus datos.

El video de la portada es opcional. Debe ir **sin audio, en bucle y pesar menos de 5 MB**;
no se reproduce en teléfonos (ahí se ve el póster), a propósito. Detalles en
`public/video/LEEME.txt`.

### Contenido provisional

Nada en este repositorio es información oficial verificada. Todo lo pendiente dice
`[CONTENIDO POR DEFINIR]`, y en pantalla aparece como una etiqueta ámbar
**CONTENIDO POR DEFINIR** — imposible que se publique por descuido sin notarlo. Basta
con escribir el dato real encima desde el panel.

Los **nombres de catequistas son ficticios** y así se advierte en la propia sección.

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
npm run build     # comprueba tipos y genera dist/
```

El panel `/admin` **no** funciona en `npm run dev` con esta configuración: necesita el
inicio de sesión del sitio publicado.

> Este repositorio es **independiente** del sistema de gestión a propósito: Render
> redespliega el backend en cada push a su repo, y corregir un párrafo de esta web no
> debe poder tumbar el API.

---

## Estructura

```
content/             ← todo el contenido editable (lo que edita /admin)
public/
├── admin/           ← panel de administración (Decap CMS)
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
