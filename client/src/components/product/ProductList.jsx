/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useState, useContext } from 'react'
import { updateProduct } from '../../firebase/firebase'
import { customContext } from '../context/CustomContext'
import { WithAuthentication, ProductTable, ProductDetail, InputSearch, Modal } from '../imports.js'

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
  const { allProducts, handleSearch, fetchFromDatabase, role, showToast } = useContext(customContext)
  const [search, setSearch] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(defaultProduct)
  const [imagenPreview, setImagenPreview] = useState('')
  const [editable, setEditable] = useState(false)

  const handleProductSelect = (productId) => {
    setSelectedProduct(productId)
    setImagenPreview(productId.thumbnail)
  }

  const saveChange = async () => {
    if (role !== 'admin') return
    const res = await updateProduct(selectedProduct)
    setEditable(false)
    await fetchFromDatabase()
    setSelectedProduct(defaultProduct)
    setImagenPreview('')
    if (res.code !== 200) return showToast('Cambios NO Guardados ', res.code)
    showToast('Se guardaron los cambios ', res.code)
  }

  const handleSearchInProducts = (searchTerm) => {
    setSearch(handleSearch(searchTerm, allProducts))
  }
  return (
    <>
      <Modal type={2} className={'md:h-[85%] md:top-[3%] lg:top-[5%] lg:h-[88%] xl:top-[3%] xxl:h-[90%]'}>
        <h2 className='text-xl pl-4 text-gray-500 font-bold mb-1 mt-3'>Products</h2>
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
        <div className='h-[30%]'>
          <ProductTable onProductSelected={handleProductSelect} data={search !== '' ? search : allProducts} />
        </div>
      </Modal>
    </>
  )
}
export default WithAuthentication(['stylist', 'admin'])(ProductList)
