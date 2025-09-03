import AboutUs from "./AboutUs"
import FeaturedProducts from "./FeaturedProducts"
import { useEffect, useRef } from 'react';
import HeroSection from "./HeroSection";
import Offer from "../components/Offer";
import RoastingProcess from "./RoastingProcess";
import { useLocation } from "react-router-dom";


export default function Home() {
  const aboutRef = useRef(null)

  const location = useLocation()
  const from = location.state?.from || 'direct'

  useEffect(() => {
    if(from === '/about'){
        aboutRef.current.scrollIntoView()
    }
  }, [from])


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