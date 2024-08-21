/* eslint-disable react-refresh/only-export-components */
import { useState, useContext, lazy } from 'react'
import { registerProduct } from '../../firebase/firebase'
import WithAuthentication from '../utils/WithAuthentication.jsx'
import { customContext } from '../context/CustomContext.jsx'
const Modal = lazy(() => import('../utils/Modal.jsx'))
const InputEdit = lazy(() => import('../utils/InputEdit.jsx'))
const InputSelect = lazy(() => import('../utils/InputSelect.jsx'))
const InputArea = lazy(() => import('../utils/InputArea.jsx'))
const ImagePreview = lazy(() => import('../utils/ImagePreview.jsx'))
const ButtonDefault = lazy(() => import('../utils/ButtonDefault.jsx'))

const ProductRegister = () => {
  const { categories, fetchFromDatabase, isDataComplete, providers, showToast, navigate } = useContext(customContext)

  const [productData, setProductData] = useState({
    name: '',
    description: '',
    category: '',
    thumbnail: '',
    price: '',
    provider: '',
    code: '',
    stock: '',
    profitEmployee: '',
    profitSaloon: '',
  })
  const [imagenPreview, setImagenPreview] = useState('')

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
      if (!isDataComplete(productData)) return showToast('Faltan propiedades', 500)

      const res = await registerProduct(productData)
      if (res.code !== 201) {
        setProductData('')
        setImagenPreview('')
        return showToast('Error in the registration process', 500)
      }
      await fetchFromDatabase()
      showToast('Successfully registered product', 200)
      setProductData('')
      setImagenPreview('')
    } catch (error) {
      throw new Error('Unhandled Error:', error)
    }
  }

  return (
    <Modal type={2} className={'!p-3 md:top-[3%] md:h-[85%] lg:top-[5%] lg:h-[88%] xl:top-[3%] xxl:h-[90%]'}>
      <h2 className='text-xl pl-4 font-bold mb-1 xxl:mb-4'>New Product</h2>
      <form className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <div className='lg:hidden '>
          <div className='mt-2'>
            <ImagePreview editable={true} imagenPreview={imagenPreview} setImagenPreview={setImagenPreview} setSelectedItem={handleInputChange} className={'!h-[30vh]'} toast={showToast} />
          </div>
        </div>
        <div>
          <InputEdit labelName={'Nombres'} value={productData.name} name={'name'} onChange={handleInputChange} className='h-8' edit />

          <InputSelect
            label={'Proveedor'}
            name={'provider'}
            itemOption={providers}
            itemValue={productData.provider}
            optionValueKey='id'
            optionDisplayKey='name'
            handleFieldChange={handleInputChange}
            className='h-8'
            editable
          />

          <InputSelect name={'category'} label={'Categoria'} itemOption={categories} itemValue={productData.category} handleFieldChange={handleInputChange} className='h-8' editable />
          <InputEdit labelName={'Codigo'} value={productData.code} name={'code'} onChange={handleInputChange} edit className='h-8' />
          <InputEdit labelName={'Stock'} type='number' value={productData.stock} name={'stock'} onChange={handleInputChange} edit className='h-8' />
          <InputEdit labelName={'Precio'} type='number' value={productData.price} name={'price'} onChange={handleInputChange} edit className='h-8' />
        </div>
        <div>
          <div className='sm:hidden md:hidden lg:flex lg:my-[10%] xl:my-[12%]'>
            <ImagePreview
              imagenPreview={imagenPreview}
              setImagenPreview={setImagenPreview}
              setSelectedItem={handleInputChange}
              editable
              className={`${imagenPreview !== '' ? '!h-fit' : 'h-[40%]'} `}
              toast={showToast}
            />
          </div>

          <InputEdit labelName={'Ganancia Salon'} type='number' value={productData.profitSaloon} name={'profitSaloon'} onChange={handleInputChange} edit className='h-8' />
          <InputEdit labelName={'Ganancia Empleado'} type='number' value={productData.profitEmployee} name={'profitEmployee'} onChange={handleInputChange} edit className='h-8' />
        </div>
      </form>
      <InputArea labelName={'Descripcion'} name={'description'} onChange={handleInputChange} value={productData.description} edit className='h-12' />
      <div className='flex flex-wrap justify-end mt-2 sm:mb-2 xxl:mt-6'>
        <ButtonDefault title='Cancelar' onClick={() => navigate(-1)} />
        <ButtonDefault title='Agregar' onClick={handleAddProduct} />
      </div>
    </Modal>
  )
}
export default WithAuthentication(['admin'])(ProductRegister)
