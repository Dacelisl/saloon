/* eslint-disable react-refresh/only-export-components */
import { useState, useContext } from 'react'
import { registerProduct } from '../../firebase/firebase'
import { customContext } from '../context/CustomContext'
import { WithAuthentication, InputEdit, InputSelect, InputArea, ImagePreview, ButtonDefault, Modal } from '../imports.js'

const ProductRegister = () => {
  const { categories, providers, showToast, navigate } = useContext(customContext)

  const [productData, setProductData] = useState('')
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
      const res = await registerProduct(productData)

      if (res.code !== 201) {
        showToast('Error in the registration process', 500)
      }
      showToast('Successfully registered product', 200)
      setProductData('')
      setImagenPreview('')
    } catch (error) {
      throw new Error('Unhandled Error:', error)
    }
  }

  return (
    <Modal type={2} className={'xxl:h-[90%] xxl:top-[1%] xxxl:h-[75%]'}>
      <h2 className='text-xl pl-4 font-bold mb-1 xxl:mb-4'>New Product</h2>
      <form className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <div className='lg:hidden '>
          <div className='mt-2'>
            <ImagePreview editable={true} imagenPreview={imagenPreview} setImagenPreview={setImagenPreview} setSelectedItem={handleInputChange} className={'!h-[30vh]'} toast={showToast} />
          </div>
        </div>
        <div>
          <InputEdit labelName={'Nombres'} value={productData.name} name={'name'} onChange={handleInputChange} className='h-8' edit />
          <InputSelect name={'provider'} label={'Proveedor'} itemOption={providers} itemValue={productData.provider} handleFieldChange={handleInputChange} className='h-8' editable />
          <InputSelect name={'category'} label={'Categoria'} itemOption={categories} itemValue={productData.category} handleFieldChange={handleInputChange} className='h-8' editable />
          <InputEdit labelName={'Codigo'} value={productData.code} name={'code'} onChange={handleInputChange} edit className='h-8' />
          <InputEdit labelName={'Stock'} type='number' value={productData.stock} name={'stock'} onChange={handleInputChange} edit className='h-8' />
        </div>
        <div>
          <div className='sm:hidden md:hidden lg:contents'>
            <ImagePreview
              imagenPreview={imagenPreview}
              setImagenPreview={setImagenPreview}
              setSelectedItem={handleInputChange}
              editable
              className={`${imagenPreview !== '' ? '!h-fit':'h-[40%]' } `}
              toast={showToast}
            />
          </div>
          <InputEdit labelName={'Precio'} type='number' value={productData.price} name={'price'} onChange={handleInputChange} edit className='h-8' />
          <InputEdit labelName={'Ganancia Salon'} type='number' value={productData.profitSaloon} name={'profitSaloon'} onChange={handleInputChange} edit className='h-8' />
          <InputEdit labelName={'Ganancia Empleado'} type='number' value={productData.profitEmployee} name={'profitEmployee'} onChange={handleInputChange} edit className='h-8' />
        </div>
      </form>
      <InputArea labelName={'Descripcion'} name={'description'} onChange={handleInputChange} value={productData.description} edit className='h-12' />
      <div className='flex flex-wrap justify-end mt-2 mb-2 xxl:mt-6'>
        <ButtonDefault title='Cancelar' onClick={() => navigate(-1)} />
        <ButtonDefault title='Agregar' onClick={handleAddProduct} />
      </div>
    </Modal>
  )
}
export default WithAuthentication(['admin'])(ProductRegister)
