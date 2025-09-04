// import DataTable from "../components/dataTable";
import { useEffect, useState } from "react";
import DataTable from './DataTable'

export default function AdminPage(){

    const [products, setProducts] = useState([])

    useEffect(() => {
      async function getData() {
        try {
          const response = await fetch('http://localhost:3030/products');
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      }

      getData();
    }, []);
    
    
    return <>
    {/* <DataTable data={products}/> */}
    <DataTable data={products}/>
    </>
}