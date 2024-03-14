/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import ProductTable from './ProductTable'
import ProductDetail from './ProductDetail'
import Test from '../modals/Test'
import SearchClient from '../utils/SearchClient'
import { getProductsByName } from '../../firebase/firebase'

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
const ProductList = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(defaultProduct)
  const [selectedProductId, setSelectedProductId] = useState('')
  const [search, setSearch] = useState('')
  const [imagenPreview, setImagenPreview] = useState('')

  useEffect(() => {
    const selected = products.find((product) => product.id === selectedProductId)
    setSelectedProduct(selected || defaultProduct)
    setImagenPreview(selected?.thumbnail || '')
  }, [products, selectedProductId])
  

  const handleProductSelect = (productId) => {
    setSelectedProductId(productId.id)
  }

  const saveChange = () => {
    console.log('se guardo todo ', selectedProduct)
  }

  const handleSearch = async (searchTerm) => {
    const products = await getProductsByName(searchTerm)
    setSearch(products)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSelectedProduct((prevFields) => ({
      ...prevFields,
      [name]: value,
    }))
  }

  return (
    <>
      <div className=' fixed inset-0 flex items-center top-[-5%] md:top-0 justify-center bg-secondary-light backdrop-blur-xl  bg-opacity-75'>
        <Test></Test>
        <div className='z-10 bg-primary-light  p-4 max-w-md mx-auto rounded-lg shadow-xl shadow-slate-800'>
          <h2 className='text-xl pl-4 text-gray-500 font-bold mb-1'>Products</h2>
          <ProductDetail
            selectedProduct={selectedProduct}
            imagenPreview={imagenPreview}
            setImagenPreview={setImagenPreview}
            setSelectedProduct={setSelectedProduct}
            handleInputChange={handleInputChange}
            saveChange={saveChange}
          />
          <SearchClient onSearch={handleSearch} />
          <ProductTable onProductSelected={handleProductSelect} data={search? search: products} />
          {/* <div className='flex-1'>{products.length > 0 ? <ProductTable onProductSelected={handleProductSelect} data={products} /> : <></>}</div> */}
        </div>
      </div>
    </>
  )
}

export default ProductList
