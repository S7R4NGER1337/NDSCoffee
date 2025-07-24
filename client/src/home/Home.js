import Nav from "../components/nav"
import AboutUs from "./AboutUs"
import FeaturedProducts from "./FeaturedProducts"
import './home.css'

export default function Home() {
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
            <Nav navName='NDS' navLinks={linkings} />
            <div className="banner">
                <h1>NDS Coffee</h1>
                <button className="bannerBtn">Catalog</button>
            </div>
            <FeaturedProducts/>
            <AboutUs />
        </>
    )
}