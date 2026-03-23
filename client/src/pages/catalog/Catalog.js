import { useEffect, useState, useMemo } from 'react'
import CatalogCard from './CatalogCard'
import styles from './catalog.module.css'
import { API_URL } from '../../api/config'

export default function Catalog() {
  const [products, setProducts] = useState([])
  const [filters, setFilters] = useState({
    roastLevel: '',
    origin: '',
    sort: 'Featured',
  })

  useEffect(() => {
    async function getProducts() {
      const response = await fetch(`${API_URL}/products/available`)
      const data = await response.json()
      setProducts(data)
    }
    getProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (filters.roastLevel) {
      result = result.filter((p) => p.roastLevel === filters.roastLevel)
    }

    if (filters.origin) {
      result = result.filter((p) => p.origin === filters.origin)
    }

    if (filters.sort === 'PriceL') {
      result.sort((a, b) => a.price - b.price)
    } else if (filters.sort === 'PriceH') {
      result.sort((a, b) => b.price - a.price)
    }

    return result
  }, [products, filters])

  function resetFilters() {
    setFilters({ roastLevel: '', origin: '', sort: 'Featured' })
  }

  const hasActiveFilters = filters.roastLevel || filters.origin || filters.sort !== 'Featured'

  return (
    <div className={styles.catalogContainer}>
      <div className={styles.catalogPageInfo}>
        <h1 className={styles.catalogHeading}>All Coffee Beans</h1>
        <p className={styles.catalogText}>
          Explore our curated collection of the finest coffee beans from around the world.
        </p>
      </div>
      <div className={styles.filtersContainer}>
        <div className={styles.filters}>
          <select
            className={styles.selectInput}
            name="RoastLevel"
            value={filters.roastLevel}
            onChange={(e) => setFilters({ ...filters, roastLevel: e.target.value })}
          >
            <option value="">All Roast Levels</option>
            <option value="Light">Light</option>
            <option value="Medium">Medium</option>
            <option value="MediumDark">Medium-Dark</option>
            <option value="Dark">Dark</option>
          </select>
          <select
            className={styles.selectInput}
            name="Origin"
            value={filters.origin}
            onChange={(e) => setFilters({ ...filters, origin: e.target.value })}
          >
            <option value="">All Origins</option>
            <option value="Colombia">Colombia</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Brazil">Brazil</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Kenya">Kenya</option>
            <option value="CostaRica">Costa Rica</option>
            <option value="Indonesia">Indonesia</option>
            <option value="India">India</option>
            <option value="Honduras">Honduras</option>
            <option value="Panama">Panama</option>
          </select>
          {hasActiveFilters && (
            <button className={styles.resetButton} onClick={resetFilters}>
              Clear Filters
            </button>
          )}
        </div>
        <div className={styles.sort}>
          <label className={styles.sortLabel}>Sort by:</label>
          <select
            className={styles.selectInput}
            name="Sort"
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          >
            <option value="Featured">Featured</option>
            <option value="PriceL">Price: low to high</option>
            <option value="PriceH">Price: high to low</option>
          </select>
        </div>
      </div>
      <div className={styles.catalogCards}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <CatalogCard productData={product} key={product._id} />
          ))
        ) : (
          <p>No products match the selected filters.</p>
        )}
      </div>
    </div>
  )
}
