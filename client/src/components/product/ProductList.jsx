/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from 'react'
import { updateProduct } from '../../firebase/firebase'
import { customContext } from '../context/CustomContext'
import { WithAuthentication, ProductTable, ProductDetail, InputSearch, Modal } from '../imports.js'

const ProductList = () => {
  const { allProducts, selectedProduct, setSelectedProduct, handleSearch, fetchFromDatabase, role, showToast } = useContext(customContext)

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
    if (role !== 'admin') return
    const res = await updateProduct(selectedProduct)
    setEditable(false)
    await fetchFromDatabase()
    setSelectedProduct('')
    if (res.code !== 200) return showToast('Cambios NO Guardados ', res.code)
    showToast('Se guardaron los cambios ', res.code)
  }

  const handleSearchInProducts = (searchTerm) => {
    setSearch(handleSearch(searchTerm, allProducts))
  }
  return (
    <>
      <Modal type={2} className={'xl:h-[85%] xl:top-[2%] xxl:h-[94%] xxl:top-[1%] xxxl:h-[90%]'}>
        <h2 className='text-xl pl-4 text-gray-500 font-bold mb-1'>Products</h2>
        <ProductDetail
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          imagenPreview={imagenPreview}
          setImagenPreview={setImagenPreview}
          editable={editable}
          setEditable={setEditable}
          saveChange={saveChange}
          toast={showToast}
          role={role}
        />
        <InputSearch onSearch={handleSearchInProducts} />
        <ProductTable onProductSelected={handleProductSelect} data={search !== '' ? search : allProducts} />
      </Modal>
    </>
  )
}
export default WithAuthentication(['stylist', 'admin'])(ProductList)
