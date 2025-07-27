import { Link } from "react-router-dom";
import Nav from "../components/nav"
import AboutUs from "./AboutUs"
import FeaturedProducts from "./FeaturedProducts"
import './home.css'
import { useRef } from 'react';


export default function Home() {
  const aboutRef = useRef(null)
    
    const linkings = [
        {
            linkPath: '/about',
            linkName: 'About us'
        },
        {
            linkPath: '/catalog',
            linkName: 'Catalog'
        }
    ]

    return (
        <>
            <Nav navName='NDS' navLinks={linkings} aboutRef={aboutRef}/>
            <div className="banner">
                <h1>NDS Coffee</h1>
                <Link to={'/catalog'} style={{textDecoration: 'none', color: 'inherit'}}>
                    <button className="bannerBtn">Catalog</button>
                </Link>
            </div>
            <FeaturedProducts/>
            <div ref={aboutRef}>
                <AboutUs />
            </div>
        </>
    )
}