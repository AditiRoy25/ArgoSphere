'use client'

import FeaturesSection from "../components/common/FeacherSection";
import Footer from "../components/common/Footer";
import HeroSection from "../components/common/HeroSection";
import Navbar from "../components/common/Navbar";
import QuickServices from "../components/common/QuickServices";
import StatisticsSection from "../components/common/StatisticsSection";



export default function Home() {
  return (
    <>
      <Navbar/>
      <HeroSection />
      <QuickServices />
      <FeaturesSection />
      <StatisticsSection />
      <Footer/>
    </>
  );
}