/* eslint-disable react/prop-types */
import { useState, useContext, lazy } from 'react'
import { customContext } from '../context/CustomContext.jsx'
const InputEdit = lazy(() => import('../utils/InputEdit.jsx'))
const InputArea = lazy(() => import('../utils/InputArea.jsx'))
const ButtonDefault = lazy(() => import('../utils/ButtonDefault.jsx'))
const ImagePreview = lazy(() => import('../utils/ImagePreview.jsx'))
const InputSelect = lazy(() => import('../utils/InputSelect.jsx'))

const ProductDetail = ({ selectedProduct, setSelectedProduct, editable, setEditable, saveChange, imagenPreview, setImagenPreview, role, toast }) => {
  const { categories, providers, navigate } = useContext(customContext)
  const [prevData, setPrevData] = useState('')

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setSelectedProduct({ ...selectedProduct, [name]: value })
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
    <>
      <form className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <div className='lg:hidden'>
          <div className='h-[55%]'>
            <ImagePreview editable={editable} imagenPreview={imagenPreview} setImagenPreview={setImagenPreview} setSelectedItem={handleFieldChange} toast={toast} />
          </div>
        </div>
        <div>
          <InputEdit labelName={'Nombre'} value={selectedProduct.name} edit={editable} onChange={handleFieldChange} type={'text'} name={'name'} />
          <InputSelect label={'Proveedor'} name={'provider'} itemOption={providers} itemValue={selectedProduct.provider} handleFieldChange={handleFieldChange} editable={editable} />
          <InputSelect label={'Categoria'} name={'category'} itemOption={categories} itemValue={selectedProduct.category} handleFieldChange={handleFieldChange} editable={editable} />
          <InputEdit labelName={'Code'} value={selectedProduct.code} onChange={handleFieldChange} type={'text'} name={'code'} />
          <InputEdit labelName={'Stock'} value={selectedProduct.stock} edit={editable} onChange={handleFieldChange} type={'number'} name={'stock'} />
          <InputEdit labelName={'Precio'} value={selectedProduct.price} edit={editable} onChange={handleFieldChange} type={'number'} name={'price'} />
        </div>
        <div>
          <div className='sm:hidden md:hidden lg:flex h-[45%] lg:mb-2'>
            <ImagePreview editable={editable} imagenPreview={imagenPreview} setImagenPreview={setImagenPreview} setSelectedItem={handleFieldChange} toast={toast} />
          </div>
          <InputEdit labelName={'Ganancia Empleado %'} value={selectedProduct.profitEmployee} edit={editable} onChange={handleFieldChange} type={'number'} name={'profitEmployee'} />
          <InputEdit labelName={'Ganancia Salon %'} value={selectedProduct.profitSaloon} edit={editable} onChange={handleFieldChange} type={'number'} name={'profitSaloon'} />
          <InputArea labelName={'Descripcion'} name={'Description'} onChange={handleFieldChange} value={selectedProduct.description} edit={editable} className='h-[8vh]' />
        </div>
      </form>

      {role === 'admin' ? (
        <div className={` ${editable ? 'hidden' : 'flex my-2'}`}>
          <span className='contents'>
            <ButtonDefault title='Edit' onClick={handleEdit} />
            <ButtonDefault title='Agregar' onClick={() => navigate('/registerProduct')} />
          </span>
        </div>
      ) : (
        ''
      )}
      {editable ? (
        <div className='flex my-2'>
          <ButtonDefault title='Save' onClick={saveChange} />
          <ButtonDefault title='Cancel' onClick={handleCancel} />
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default ProductDetail
