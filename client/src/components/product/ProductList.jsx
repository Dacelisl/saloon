/* eslint-disable react/prop-types */
import { useState, useEffect, useContext, lazy } from 'react'
import { updateProduct, getProducts } from '../../firebase/firebase'
import { customContext } from '../context/CustomContext'
const ProductTable = lazy(() => import('./ProductTable'))
const ProductDetail = lazy(() => import('./ProductDetail'))
const InputSearch = lazy(() => import('../utils/InputSearch'))
const Modal = lazy(() => import('../utils/Modal'))

const ProductList = () => {
  const { defaultProduct, allProducts, setAllProducts, selectedProduct, setSelectedProduct,handleSearch, fetchFromDatabase, showToast } = useContext(customContext)


  const [search, setSearch] = useState('')
  const [imagenPreview, setImagenPreview] = useState('')
  const [editable, setEditable] = useState(false)


  useEffect(() => {
    const selected = allProducts.find((product) => product.id === selectedProduct.id)
    setImagenPreview(selected?.thumbnail || '')
  }, [allProducts, selectedProduct])

  const handleProductSelect = (productId) => {
    setSelectedProduct(productId)
  }

  const saveChange = async () => {
    const res = await updateProduct(selectedProduct)
    setEditable(false)
    /* const productUpdate = await getProducts()
    setAllProducts(productUpdate) */
    await fetchFromDatabase()
    setSelectedProduct(defaultProduct)
    if (res.code > 200) return showToast('Cambios NO Guardados ', res.code)
    showToast('Se guardaron los cambios ', res.code)

    
  }

  const handleSearchInProducts = (searchTerm) => {
    setSearch(handleSearch(searchTerm, allProducts))
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
        <InputSearch onSearch={handleSearchInProducts} />
        <ProductTable onProductSelected={handleProductSelect} data={search !== '' ? search : allProducts} />
      </Modal>
    </>
  )
}

export default ProductList
