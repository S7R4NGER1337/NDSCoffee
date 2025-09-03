import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function AboutRedirect() {
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/', { state: {from: window.location.pathname}})
    }, [navigate])

    return null
}