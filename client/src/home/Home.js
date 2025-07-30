import { Link } from "react-router-dom";
import Nav from "../components/nav"
import AboutUs from "./AboutUs"
import FeaturedProducts from "./FeaturedProducts"
import styles from './home.module.css'
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
            <Nav navName='NDS' navLinks={linkings} aboutRef={aboutRef} color={'white'}/>
            <div className={styles.banner}>
                <h1 className={styles.bannerName}>NDS Coffee</h1>
                <p className={styles.bannerText}>Carefully selected beans from the world's finest plantations.</p>
                <Link to={'/catalog'} style={{textDecoration: 'none', color: 'inherit'}}>
                    <button className={styles.bannerBtn}>Explore Catalog</button>
                </Link>
            </div>
            <FeaturedProducts/>
            <div ref={aboutRef}>
                <AboutUs />
            </div>
        </>
    )
}