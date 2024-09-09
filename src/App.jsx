import Hero from './sections/Hero.jsx';
import Navbar from "./sections/Navbar.jsx";
import About from "./sections/About.jsx";
import Projects from "./sections/Projects.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";
import Experience from "./sections/Experience.jsx";


const App = () => {
    return (
        <main className="max-w-7xl mx-auto">
            <Navbar />
            <Hero />
            <About />
            <Projects />
            <Contact />
            <Experience />
            <Footer />
        </main>
    )
}

export default App
