import { useLocation } from "react-router-dom"


export default function ProductPage(){
    const productId = useLocation().pathname.split('/')[2]
    console.log(productId);
    
    return <h1>Hello</h1>
}