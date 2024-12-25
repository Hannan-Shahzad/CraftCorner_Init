'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  sellerId: string
}

export default function SearchResults({ query }: { query: string }) {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = () => {
      const allProducts: Product[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith('sellerProducts_')) {
          const sellerProducts = JSON.parse(localStorage.getItem(key) || '[]')
          allProducts.push(...sellerProducts)
        }
      }
      setProducts(allProducts)
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div>
      <h2 className="text-2xl font-bold text-pink-600 mb-4">Search Results</h2>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="block">
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4">
                <div className="aspect-square mb-4">
                  <img src={product.image} alt={product.name} className="object-cover w-full h-full rounded-md" />
                </div>
                <h3 className="text-lg font-semibold text-pink-600 mb-2">{product.name}</h3>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No products found matching your search.</p>
      )}
    </div>
  )
}
