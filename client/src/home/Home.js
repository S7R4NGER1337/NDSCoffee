import AboutUs from "./AboutUs"
import FeaturedProducts from "./FeaturedProducts"
import { useRef } from 'react';
import HeroSection from "./HeroSection";


export default function Home() {
  const aboutRef = useRef(null)

    return (
        <>
           <HeroSection />
            <FeaturedProducts/>
            <div ref={aboutRef}>
                <AboutUs />
            </div>
        </>
    )
}