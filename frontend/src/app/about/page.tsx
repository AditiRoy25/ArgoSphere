
import AboutHero from "@/src/components/about/AboutHero";

import OurStory from "@/src/components/about/OurStory";

import Footer from "@/src/components/common/Footer";
import Navbar from "@/src/components/common/Navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <AboutHero />

      <OurStory />

      <Footer />
    </>
  );
}