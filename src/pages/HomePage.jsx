import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Values from "../components/Values";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Values />
      <Testimonials />
      <Footer />
    </>
  );
};

export default HomePage;
