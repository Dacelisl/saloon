import { useState, useEffect, lazy } from 'react'
import { registerProduct, getCategories, getProviders } from '../../firebase/firebase'
const InputEdit = lazy(() => import('../utils/InputEdit'))
const InputSelect = lazy(() => import('../utils/InputSelect'))
const InputArea = lazy(() => import('../utils/InputArea'))
const ImagePreview = lazy(() => import('../utils/ImagePreview'))
const ButtonDefault = lazy(() => import('../utils/ButtonDefault'))
const Modal = lazy(() => import('../utils/Modal'))

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
const ProductRegister = () => {
  const [productData, setProductData] = useState(defaultProduct)
  const [imagenPreview, setImagenPreview] = useState('')
  const [categories, setCategories] = useState([])
  const [providers, setProviders] = useState([])

  useEffect(() => {
    const fetchCategoriesFromDatabase = async () => {
      try {
        const categ = await getCategories()
        setCategories(categ)
        const prov = await getProviders()
        setProviders(prov)
      } catch (error) {
        throw new Error(`error getting data`)
      }
    }
    fetchCategoriesFromDatabase()
  }, [])

  const handleInputChange = (e) => {
    let { name, value } = e.target
    if (name === 'stock' || name === 'price' || name === 'profitEmployee' || name === 'profitSaloon') {
      value = parseInt(value)
    }
    setProductData({
      ...productData,
      [name]: value,
    })
  }
  const handleAddProduct = async (e) => {
    e.preventDefault()
    try {
      const res = await registerProduct(productData)
      if (res === 201) {
        setProductData(defaultProduct)
        setImagenPreview('')
        console.log('se almaceno correctamente ')
      } else {
        console.log('error en la carga')
      }
    } catch (error) {
      throw new Error('Unhandled Error:', error)
    }
  }

  return (
    <Modal type={2} className={'xl:w-[65%] xxl:w-[50%]'}>
      <h2 className='text-xl pl-4 font-bold mb-1'>New Product</h2>
      <div className='flex mb-1'>
        <div className='w-[50%]'>
          <div className=' p-4 mb-1 rounded-md'>
            <InputEdit labelName={'Nombres'} value={productData.name} name={'name'} onChange={handleInputChange} className='h-8' edit />
            <InputSelect name={'provider'} label={'Proveedor'} itemOption={providers} itemValue={productData.provider} handleFieldChange={handleInputChange} className='h-8' editable />
            <InputSelect name={'category'} label={'Categoria'} itemOption={categories} itemValue={productData.category} handleFieldChange={handleInputChange} className='h-8' editable />
            <InputEdit labelName={'Codigo'} value={productData.code} name={'code'} onChange={handleInputChange} edit className='h-8' />
            <InputEdit labelName={'Stock'} type='number' value={productData.stock} name={'stock'} onChange={handleInputChange} edit className='h-8' />
          </div>
        </div>
        <div className='w-[45%] ml-4  mt-1'>
          <div className='h-[35%] mt-4 mb-2'>
            <ImagePreview imagenPreview={imagenPreview} setImagenPreview={setImagenPreview} setSelectedItem={handleInputChange} editable={true} style='h-[90%]' />
          </div>
          <InputEdit labelName={'Precio'} type='number' value={productData.price} name={'price'} onChange={handleInputChange} edit className='h-8' />
          <InputEdit labelName={'Ganancia Salon'} type='number' value={productData.profitSaloon} name={'profitSaloon'} onChange={handleInputChange} edit className='h-8' />
          <InputEdit labelName={'Ganancia Empleado'} type='number' value={productData.profitEmployee} name={'profitEmployee'} onChange={handleInputChange} edit className='h-8' />
        </div>
      </div>
      <InputArea labelName={'Descripcion'} name={'description'} onChange={handleInputChange} value={productData.description} edit className='h-12' />
      <div className='flex flex-wrap justify-end mt-4'>
        <ButtonDefault title='Cancelar' /*  onClick={onClose} */ />
        <ButtonDefault title='Agregar' onClick={handleAddProduct} />
      </div>
    </Modal>
  )
}

export default ProductRegister
