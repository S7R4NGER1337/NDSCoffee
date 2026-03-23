import { useEffect, useState } from 'react'
import DataTable from './DataTable'
import { getAllProducts } from '../../api/products'

export default function AdminPage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchProducts() {
      const data = await getAllProducts()
      setProducts(data)
    }
    fetchProducts()
  }, [])

  return <DataTable data={products} />
}
