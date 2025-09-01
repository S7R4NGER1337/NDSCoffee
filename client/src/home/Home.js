import AboutUs from "./AboutUs"
import FeaturedProducts from "./FeaturedProducts"
import { useRef } from 'react';
import HeroSection from "./HeroSection";
import Offer from "../components/Offer";
import RoastingProcess from "./RoastingProcess";


export default function Home() {
  const aboutRef = useRef(null)

    return (
        <div style={{display: "flex", flexDirection: 'column', gap: '4rem'}}>
           <HeroSection />
           <Offer />
            <FeaturedProducts/>
            <div ref={aboutRef}>
                <AboutUs />
            </div>
            <RoastingProcess />
        </div>
    )
}