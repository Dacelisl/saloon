/* eslint-disable react/prop-types */
import { useState, useContext, lazy } from 'react'
import { customContext } from '../context/CustomContext.jsx'
const InputEdit = lazy(() => import('../utils/InputEdit.jsx'))
const InputArea = lazy(() => import('../utils/InputArea.jsx'))
const ButtonDefault = lazy(() => import('../utils/ButtonDefault.jsx'))
const ImagePreview = lazy(() => import('../utils/ImagePreview.jsx'))
const InputSelect = lazy(() => import('../utils/InputSelect.jsx'))

const ProductDetail = ({ selectedProduct, setSelectedProduct, editable, setEditable, saveChange, imagenPreview, setImagenPreview, toast }) => {
  const { categories, providers, isTimeAllowed, isUserAllowed, navigate } = useContext(customContext)
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

          <InputSelect label={'Proveedor'} name={'provider'} itemOption={providers} handleFieldChange={handleFieldChange} itemValue={selectedProduct.provider} editable={editable} />

          <InputSelect label={'Categoria'} name={'category'} itemOption={categories} itemValue={selectedProduct.category} handleFieldChange={handleFieldChange} editable={editable} />
          <InputEdit labelName={'Code'} value={selectedProduct.code} onChange={handleFieldChange} edit={editable} type={'text'} name={'code'} />
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

      <div className={` ${editable ? 'hidden' : 'flex my-2'}`}>
        <span className={` ${isUserAllowed(['admin', 'auxiliary']) ? 'contents' : 'hidden'}`}>
          <ButtonDefault title='Editar' onClick={handleEdit} disabled={!isTimeAllowed(['admin', 'auxiliary'])} />
          <ButtonDefault title='Agregar' onClick={() => navigate('/registerProduct')} disabled={!isTimeAllowed(['admin', 'auxiliary'])} />
        </span>
      </div>

      {editable ? (
        <div className='flex my-2'>
          <ButtonDefault title='Guardar' onClick={saveChange} />
          <ButtonDefault title='Cancelar' onClick={handleCancel} />
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default ProductDetail
