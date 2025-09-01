import AboutUs from "./AboutUs"
import FeaturedProducts from "./FeaturedProducts"
import { useRef } from 'react';
import HeroSection from "./HeroSection";
import Offer from "../components/Offer";
import RoastingProcess from "./RoastingProcess";


export default function Home() {
  const aboutRef = useRef(null)

    return (
        <>
           <HeroSection />
           <Offer />
            <FeaturedProducts/>
            <div ref={aboutRef}>
                <AboutUs />
            </div>
            <RoastingProcess />
        </>
    )
}