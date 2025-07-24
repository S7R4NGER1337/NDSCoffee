import Nav from "../components/nav"
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
        </>
    )
}