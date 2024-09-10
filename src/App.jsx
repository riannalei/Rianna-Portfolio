import Hero from './sections/Hero.jsx';
import Navbar from "./sections/Navbar.jsx";
import About from "./sections/About.jsx";
import Projects from "./sections/Projects.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";
import Experience from "./sections/Experience.jsx";

const App = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Responsive padding */}
                <Hero />

                {/* About Section with Responsive Margin */}
                <div className="my-10 sm:my-16 lg:my-12 xl:my-8"> {/* Adjusted margin for larger screens */}
                    <About />
                </div>

                {/* Projects Section with Responsive Margin */}
                <div className="my-10 sm:my-16 lg:my-12 xl:my-8"> {/* Adjusted margin for larger screens */}
                    <Projects />
                </div>

                {/* Experience Section */}
                <div className="my-10 sm:my-16 lg:my-12 xl:my-8">
                    <Experience />
                </div>

                {/* Contact Section */}
                <div className="my-10 sm:my-16 lg:my-12 xl:my-8">
                    <Contact />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default App;
