import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Welcome } from "./components/Welcome";
import { Courses } from "./components/Courses";
import { Schedules } from "./components/Schedules";
import { Registration } from "./components/Registration";
import { Catechists } from "./components/Catechists";
import { PopeMessage } from "./components/PopeMessage";
import { Announcements } from "./components/Announcements";
import { Gallery } from "./components/Gallery";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

/**
 * Single page. The order follows the agreed priority: registration and courses first,
 * everything else after. Announcements and events share a single section, and the
 * requirements live inside Registration so that what people look up in one go isn't
 * split in two.
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
        <PopeMessage />
        <Catechists />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
