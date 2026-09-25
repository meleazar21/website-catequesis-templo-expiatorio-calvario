import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

/**
 * En desarrollo, /admin y /admin/ caen en el "fallback" de una sola página y
 * devuelven el sitio público en vez del panel. Esto los reescribe a su archivo
 * real antes de que Vite llegue a ese fallback.
 *
 * Solo afecta a `npm run dev`: en el sitio publicado, /admin/ lo resuelve el
 * hosting, que sí sirve el index.html de la carpeta.
 */
function paginaDeAdmin(): Plugin {
  return {
    name: "pagina-de-admin",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url === "/admin" || req.url === "/admin/") {
          req.url = "/admin/index.html";
        }
        next();
      });
    },
  };
}

export default defineConfig({ plugins: [react(), paginaDeAdmin()] });
