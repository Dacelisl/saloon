/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import ProductTable from './ProductTable'
import ProductDetail from './ProductDetail'
import SearchClient from '../utils/SearchClient'
import { updateProduct, getProducts } from '../../firebase/firebase'
import Modal from '../utils/Modal'

const defaultProduct = {
  name: '',
  provider: '',
  category: '',
  code: '',
  stock: '',
  price: '',
  thumbnail: '',
  profitEmployee: '',
  profitSaloon: '',
  description: '',
}
const ProductList = () => {
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(defaultProduct)
  const [selectedProductId, setSelectedProductId] = useState('')
  const [search, setSearch] = useState('')
  const [imagenPreview, setImagenPreview] = useState('')
  const [editable, setEditable] = useState(false)

  useEffect(() => {
    const fetchFromDatabase = async () => {
      try {
        const allProducts = await getProducts()
        setProducts(allProducts)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchFromDatabase()
  }, [])

  useEffect(() => {
    const selected = products.find((product) => product.id === selectedProductId)
    setSelectedProduct(selected || defaultProduct)
    setImagenPreview(selected?.thumbnail || '')
  }, [products, selectedProductId])

  const handleProductSelect = (productId) => {
    setSelectedProductId(productId.id)
  }

  const saveChange = async () => {
    await updateProduct(selectedProduct)
    setEditable(false)
    const updatedProducts = await getProducts()
    setProducts(updatedProducts)
  }

  const handleSearch = (searchTerm) => {
    if (searchTerm === '') return setSearch('')
    const filtered = products.filter((product) =>
      Object.entries(product).some(([key, value]) => typeof value === 'string' && key !== 'thumbnail' && value.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    setSearch(filtered)
  }

  return (
    <>
      <Modal type={2}>
        <h2 className='text-xl pl-4 text-gray-500 font-bold mb-1'>Products</h2>
        <ProductDetail
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          imagenPreview={imagenPreview}
          setImagenPreview={setImagenPreview}
          editable={editable}
          setEditable={setEditable}
          saveChange={saveChange}
        />
        <SearchClient onSearch={handleSearch} />
        <ProductTable onProductSelected={handleProductSelect} data={search !== '' ? search : products} />
      </Modal>
    </>
  )
}

export default ProductList
