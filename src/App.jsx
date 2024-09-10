import Hero from './sections/Hero.jsx';
import Navbar from "./sections/Navbar.jsx";
import About from "./sections/About.jsx";
import Projects from "./sections/Projects.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";
import Experience from "./sections/Experience.jsx";


const App = () => {
    return (
        <div className="flex flex-col min-h-screen"> {/* Updated to use Flexbox */}
            <Navbar />
            <main className="flex-grow max-w-7xl mx-auto"> {/* Allows content to grow */}
                <Hero />
                <About />
                <Projects />
                <Experience />
                <Contact />
            </main>
            <Footer /> {/* Footer will stay at the bottom */}
        </div>
    );
};

export default App;

