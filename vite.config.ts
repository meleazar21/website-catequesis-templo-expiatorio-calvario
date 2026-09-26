import fs from "node:fs";
import path from "node:path";
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

/**
 * El panel se usa SOLO en esta computadora (`npm run admin`), así que no se publica:
 * en el sitio desplegado enseñaría un inicio de sesión que no puede funcionar, porque
 * no hay servicio de identidad detrás.
 *
 * Se borra al final del build en vez de sacar la carpeta de `public/`, para que en
 * desarrollo siga sirviéndose sola y no haya dos rutas distintas que mantener.
 *
 * ¿Publicarlo algún día? Se quita este plugin de la lista y hay que darle un `backend`
 * de verdad en public/admin/config.yml (hoy solo vale para el modo local).
 */
function panelSoloEnLocal(): Plugin {
  return {
    name: "panel-solo-en-local",
    apply: "build",
    closeBundle() {
      fs.rmSync(path.resolve("dist/admin"), { recursive: true, force: true });
      console.log("  el panel /admin no se publica (uso local)");
    },
  };
}

export default defineConfig({
  plugins: [react(), paginaDeAdmin(), panelSoloEnLocal()],
});
