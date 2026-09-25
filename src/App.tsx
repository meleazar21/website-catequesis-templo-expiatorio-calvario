import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Welcome } from "./components/Welcome";
import { Courses } from "./components/Courses";
import { Schedules } from "./components/Schedules";
import { Registration } from "./components/Registration";
import { Catechists } from "./components/Catechists";
import { Sacraments } from "./components/Sacraments";
import { Announcements } from "./components/Announcements";
import { Gallery } from "./components/Gallery";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

/**
 * Página única. El orden responde a la prioridad acordada: inscripciones y cursos
 * primero, y lo demás después. Los avisos y actividades van juntos en una sola
 * sección, y la de requisitos vive dentro de Inscripciones para no partir en dos lo
 * que la gente consulta de una sola vez.
 */
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Welcome />
        <Courses />
        <Schedules />
        <Registration />
        <Announcements />
        <Sacraments />
        <Catechists />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
