/* componente padre */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import ProductTable from './ProductTable'
import ProductDetail from './ProductDetail'
import Test from '../modals/Test'
import SearchClient from '../utils/SearchClient'
import { getProductsByName, updateProduct, getProducts } from '../../firebase/firebase'

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

  const fetchFromDatabase = async () => {
    try {
      const allProducts = await getProducts()
      setProducts(allProducts)
    } catch (error) {
      throw new Error(`error getting data`)
    }
  }
  useEffect(() => {
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
    setEditable(!editable)
    fetchFromDatabase()
  }

  const handleSearch = async (searchTerm) => {
    const products = await getProductsByName(searchTerm)
    setSearch(products)
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
            editable={editable}
            setEditable={setEditable}
            saveChange={saveChange}
          />
          <SearchClient onSearch={handleSearch} />
          <ProductTable onProductSelected={handleProductSelect} data={search ? search : products} />
        </div>
      </div>
    </>
  )
}
export default ProductList



/* componente hijo ProductDetail */

/* eslint-disable react/prop-types */
import { useState, useCallback } from 'react'
import InputEdit from '../utils/InputEdit'
import ButtonDefault from '../utils/ButtonDefault'
import ImagePreview from '../utils/ImagePreview'

const ProductDetail = ({ selectedProduct, setSelectedProduct, imagenPreview, setImagenPreview, editable, setEditable, saveChange }) => {
  const [categories, setCategories] = useState([])
  const [providers, setProviders] = useState([])
  const [prevData, setPrevData] = useState('')

  useEffect(() => {
    const fetchFromDatabase = async () => {
      try {
        const categ = await getCategories()
        setCategories(categ)
        const prov = await getProviders()
        setProviders(prov)
      } catch (error) {
        throw new Error(`error getting data`)
      }
    }
    fetchFromDatabase()
  }, [])

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }))
  }

  const handleEdit = () => {
    setPrevData(selectedProduct)
    setEditable(!editable)
  }
  const handleCancel = () => {
    setSelectedProduct(prevData)
    setImagenPreview(prevData.thumbnail)
    setEditable(!editable)
  }

  return (
    <div className='flex mb-1 border-solid border-2 border-gray-200'>
      <div className='w-[50%]'>
        <div className=' p-4 rounded-md'>
          <InputEdit labelName={'Nombre'} value={selectedProduct.name} disabled={!editable} inputChange={handleFieldChange} type={'text'} name={'name'} />
          <InputEdit labelName={'Precio'} value={selectedProduct.price} edit={!editable} inputChange={handleFieldChange} type={'number'} name={'price'} />
          {editable ? (
            <div className='flex'>
              <ButtonDefault title='Save' onClick={saveChange} />
              <ButtonDefault title='Cancel' onClick={handleCancel} />
            </div>
          ) : (
            <ButtonDefault title='Edit' onClick={handleEdit} />
          )}
        </div>
      </div>

      {/* region de la imagen y la descripcion  */}
      <div className='w-[45%] ml-4  mt-7'>



        <ImagePreview 
        editable={editable} 
        imagenPreview={imagenPreview} 
        setImagenPreview={setImagenPreview} 
        setSelectedItem={setSelectedProduct} />
      </div>
    </div>
  )
}

export default ProductDetail