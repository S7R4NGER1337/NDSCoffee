import DataTable from "../components/dataTable";
import Nav from "../components/nav";
import { useEffect, useState } from "react";

export default function AdminPage(){

    const [products, setProducts] = useState([])
    const linkings = [
    {
      linkPath: '/',
      linkName: 'Go back to the App'
    },
    {
      linkPath: '/admin/create',
      linkName: 'Create product'
    },
    {
      linkPath: '/admin/orders',
      linkName: 'Orders'
    },
  ]

    useEffect(() => {
      async function getData() {
        try {
          const response = await fetch('http://localhost:3030/products');
          const data = await response.json(); // Parse the JSON body
          setProducts(data); // Now logs actual data
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      }

      getData();
    }, []);
    
    
    return <>
    <DataTable data={products}/>
    </>
}