import { useState, useEffect } from 'react'
import { registerProduct, getCategories, getProviders } from '../../firebase/firebase'
import InputEdit from '../utils/InputEdit'
import InputSelect from '../utils/InputSelect'
import ImagePreview from '../utils/ImagePreview'
import ButtonDefault from '../utils/ButtonDefault'
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
const ModalProduct = () => {
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
            <InputEdit labelName={'Nombres'} value={productData.name} name={'name'} onChange={handleInputChange} className='h-9' edit />
            <InputSelect name={'provider'} label={'Proveedor'} itemOption={providers} itemValue={productData.provider} handleFieldChange={handleInputChange} edit className='h-9' />
            <InputSelect name={'category'} label={'Categoria'} itemOption={categories} itemValue={productData.category} handleFieldChange={handleInputChange} edit className='h-9' />
            <InputEdit labelName={'Codigo'} value={productData.code} name={'code'} onChange={handleInputChange} edit className='h-9' />
            <InputEdit labelName={'Stock'} type='number' value={productData.stock} name={'stock'} onChange={handleInputChange} edit className='h-9' />
          </div>
        </div>
        <div className='w-[45%] ml-4  mt-1'>
          <div className='h-[37%]'>
            <ImagePreview imagenPreview={imagenPreview} setImagenPreview={setImagenPreview} setSelectedItem={setProductData} editable={true} style='h-[70%]' />
          </div>
          <InputEdit labelName={'Precio'} type='number' value={productData.price} name={'price'} onChange={handleInputChange} edit className='h-9' />
          <InputEdit labelName={'Ganancia Salon'} type='number' value={productData.profitSaloon} name={'profitSaloon'} onChange={handleInputChange} edit className='h-9' />
          <InputEdit labelName={'Ganancia Empleado'} type='number' value={productData.profitEmployee} name={'profitEmployee'} onChange={handleInputChange} edit className='h-9' />
        </div>
      </div>
        <div className='pl-4 mt-0 w-full '>
          <label className='block text-xs lg:text-base xxl:text-lg  mb-1 font-semibold text-gray-600'>
            Descripcion:
            <textarea
              value={productData.description}
              onChange={handleInputChange}
              autoComplete='off'
              name='description'
              className='w-full px-3 py-2 border rounded-md'
              placeholder='Descripción del producto'
            ></textarea>
          </label>
        </div>
      <div className='flex flex-wrap justify-end mt-4'>
        <ButtonDefault title='Cancelar' /*  onClick={onClose} */ />
        <ButtonDefault title='Agregar' onClick={handleAddProduct} />
      </div>
    </Modal>
  )
}

export default ModalProduct
