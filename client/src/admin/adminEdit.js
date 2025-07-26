import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AdminEdit() {
  const [produtData, setProductData] = useState({
    name: '',
    description: '',
    price: 0,
    image: ''
  });
  const location = useLocation().pathname.split("/")[3];
  const navigate = useNavigate()

  useEffect(() => {
    async function getProductData() {
      try {
        const response = await fetch(`http://localhost:3030/products/${location}`);
        const data = await response.json();
        setProductData(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    getProductData()
  }, [location]);

  async function editProduct() {
    
    const product = await fetch(`http://localhost:3030/products/edit/${location}`, {
        method: 'POST',
        body: JSON.stringify(produtData),
        headers: {
        "Content-type": "application/json",
      }
    })

    navigate('/admin')
    return product
  }
  return <div>
    <form>
        <label>Name</label>
        <input type="text" value={produtData.name} onChange={(e) => setProductData({...produtData, name: e.target.value})}/>

        <label>Price</label>
        <input type='number' value={produtData.price} onChange={(e) => setProductData({...produtData, price: e.target.value})}/>

        <label>Description</label>
        <input type="text" value={produtData.description} onChange={(e) => setProductData({...produtData, description: e.target.value})}/>

        <label>Image</label>
        <input type="text" value={produtData.image} onChange={(e) => setProductData({...produtData, image: e.target.value})}/>

        <button type="button" onClick={() => editProduct()}>Edit</button>
    </form>
  </div>;
}
