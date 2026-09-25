# Sitio web — Grupo de Catequesis, Parroquia El Calvario

Portal informativo del **Grupo de Catequesis del Templo Expiatorio Arquidiocesano
Parroquia El Calvario**, Masaya, Nicaragua.

Es un sitio **estático**: no depende del sistema de gestión (Iter Catecheticum) ni de
ningún servidor. Eso es deliberado — el backend del sistema vive en el plan gratuito de
Render y **se duerme sin tráfico**, así que un visitante que llegara desde Google
esperaría casi un minuto. Aquí todo se sirve desde el CDN: carga instantánea.

---

## Cómo editar el contenido

**Todo el contenido está separado del diseño.** No hace falta tocar componentes:

| Archivo | Qué contiene |
|---|---|
| `src/data/site.ts` | Nombre, lema, versículo, contacto, redes, misión, visión, menú |
| `src/data/catequesis.ts` | Cursos, horarios, inscripciones, requisitos, catequistas, sacramentos, avisos, actividades, galería |

### Lo más habitual

**Abrir o cerrar las inscripciones** — `src/data/catequesis.ts`:

```ts
export const inscripciones = {
  abiertas: true,   // false muestra "Inscripciones cerradas" y desactiva el botón
  inicio: "1 de febrero de 2027",
  cierre: "28 de febrero de 2027",
  enlace: "https://forms.gle/...",   // Google Forms, formulario propio o https://wa.me/505...
  ...
};
```

**Agregar o quitar un curso** — añade o borra un objeto del arreglo `cursos`. La
tarjeta aparece sola.

**Publicar un aviso** — añade un objeto a `avisos`. Con `destacado: true` se resalta.

**Cambiar el teléfono, correo o redes** — `contacto` en `src/data/site.ts`. Los datos se
convierten en enlaces (`tel:`, `mailto:`, `wa.me`) **solo** cuando tienen valor real; los
provisionales se muestran como texto para no dejar enlaces rotos.

### Contenido provisional

Nada en este repositorio es información oficial verificada. Todo lo pendiente está
marcado con la constante `POR_DEFINIR`, y en pantalla aparece como una etiqueta ámbar
**CONTENIDO POR DEFINIR** — imposible que se publique por descuido sin notarlo.

Los **nombres de catequistas son ficticios** y así se advierte en la propia sección.

### Fotografías

El sitio **no usa fotos de archivo**: mostrar imágenes ajenas como si fueran de esta
parroquia sería engañoso. En su lugar, cada espacio tiene un marcador que dice qué
fotografía va ahí.

- **Portada**: pon la ruta en `FOTO_HERO`, al inicio de `src/components/Hero.tsx`.
- **Galería**: agrega `src: "/fotos/mi-foto.jpg"` al elemento correspondiente de
  `galeria`; las imágenes van en `public/fotos/`.
- **Catequistas y bienvenida**: mismo patrón, en sus componentes.

Comprime las fotos antes de subirlas (idealmente < 300 KB cada una).

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

## Publicación

Pensado para **Vercel** (gratis): importar el repositorio y desplegar — `vercel.json`
ya trae la configuración. Cualquier hosting de estáticos sirve igual.

> Este repositorio es **independiente** del sistema de gestión a propósito: Render
> redespliega el backend en cada push a su repo, y corregir un párrafo de esta web no
> debe poder tumbar el API.

---

## Estructura

```
src/
├── data/            ← todo el contenido editable
│   ├── site.ts
│   └── catequesis.ts
├── components/
│   ├── ui/          ← iconos SVG, animación de entrada, marcadores de foto
│   ├── Navbar.tsx      Hero.tsx        Welcome.tsx
│   ├── Courses.tsx     Schedules.tsx   Registration.tsx
│   ├── Catechists.tsx  Sacraments.tsx  Announcements.tsx
│   ├── Gallery.tsx     Contact.tsx     Footer.tsx
├── App.tsx
└── index.css
```

React 18 · TypeScript · Tailwind CSS · Vite.
