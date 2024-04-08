/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { getCategories, getProviders } from '../../firebase/firebase'
import InputEdit from '../utils/InputEdit'
import ButtonDefault from '../utils/ButtonDefault'
import ImagePreview from '../utils/ImagePreview'
import InputSelect from '../utils/InputSelect'

const ProductDetail = ({ selectedProduct, setSelectedProduct, editable, setEditable, saveChange, imagenPreview, setImagenPreview }) => {
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
    <div className='flex mb-1 border-solid border-2 border-gray-200'>
      <div className='w-[50%]'>
        <div className=' p-4 pt-3 rounded-md'>
          <InputEdit labelName={'Nombre'} value={selectedProduct.name} edit={editable} inputChange={handleFieldChange} type={'text'} name={'name'} />
          <InputSelect label={'Proveedor'} name={'provider'} itemOption={providers} itemValue={selectedProduct.provider} handleFieldChange={handleFieldChange} editable={!editable} />
          <InputSelect label={'Categoria'} name={'category'} itemOption={categories} itemValue={selectedProduct.category} handleFieldChange={handleFieldChange} editable={!editable} />
          <InputEdit labelName={'Code'} value={selectedProduct.code} inputChange={handleFieldChange} type={'text'} name={'code'} />
          <InputEdit labelName={'Stock'} value={selectedProduct.stock} edit={editable} inputChange={handleFieldChange} type={'number'} name={'stock'} />
          <InputEdit labelName={'Precio'} value={selectedProduct.price} edit={editable} inputChange={handleFieldChange} type={'number'} name={'price'} />
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
      <div className='w-[45%] ml-4  mt-6'>
        <ImagePreview editable={editable} imagenPreview={imagenPreview} setImagenPreview={setImagenPreview} setSelectedItem={setSelectedProduct} />
        <InputEdit labelName={'Ganancia Empleado %'} value={selectedProduct.profitEmployee} edit={editable} inputChange={handleFieldChange} type={'number'} name={'profitEmployee'} />
        <InputEdit labelName={'Ganancia Salon %'} value={selectedProduct.profitSaloon} edit={editable} inputChange={handleFieldChange} type={'number'} name={'profitSaloon'} />
        <div className='mt-0 w-full '>
          <label className='block text-xs font-semibold text-gray-600'>
            Descripcion:
            <textarea
              value={selectedProduct?.description}
              onChange={handleFieldChange}
              disabled={!editable}
              autoComplete='off'
              name='description'
              className='w-full px-3 h-[70px] py-2 border rounded-md'
            ></textarea>
          </label>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
