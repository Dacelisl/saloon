/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { getCategories, getProviders } from '../../firebase/firebase'
import InputEdit from '../utils/InputEdit'
import ButtonDefault from '../utils/ButtonDefault'
import ImagePreview from '../utils/ImagePreview'

const ClientDetail = ({ selectedClient, setSelectedClient, imagenPreview, setImagenPreview, handleInputChange, saveChange }) => {
  const [categories, setCategories] = useState([])
  const [providers, setProviders] = useState([])
  const [editable, setEditable] = useState(false)

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

  return (
    <div className='flex mb-1 border-solid border-2 border-gray-200'>
      <div className='w-[50%]'>
        <div className=' p-4 rounded-md'>
          <InputEdit label={'Nombre'} value={selectedClient.name} edit={!editable} inputChange={handleInputChange} type={'text'} name={'name'} />
          <div className='mb-2'>
            <label className='block text-xs font-semibold text-gray-600'>
              Proveedor:
              <select name='provider' disabled={!editable} value={selectedClient.provider} onChange={handleInputChange} className='w-full px-2 py-1 border rounded-md'>
                {editable ? (
                  providers.map((provider) => (
                    <option key={provider.id} value={provider.name}>
                      {provider.name}
                    </option>
                  ))
                ) : (
                  <option>{selectedClient.provider} </option>
                )}
              </select>
            </label>
          </div>
          <div className='mb-2'>
            <label className='block text-xs font-semibold text-gray-600'>
              Categoria:
              <select name='category' disabled={!editable} value={selectedClient?.category} onChange={handleInputChange} className='w-full px-2 py-1 border rounded-md'>
                {editable ? (
                  categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))
                ) : (
                  <option>{selectedClient.category} </option>
                )}
              </select>
            </label>
          </div>
          <InputEdit label={'Code'} value={selectedClient.code} edit={!editable} inputChange={handleInputChange} type={'text'} name={'code'} />
          <InputEdit label={'Stock'} value={selectedClient.stock} edit={!editable} inputChange={handleInputChange} type={'number'} name={'stock'} />
          <InputEdit label={'Precio'} value={selectedClient.price} edit={!editable} inputChange={handleInputChange} type={'number'} name={'price'} />
          {editable ? (
            <div className='flex'>
              <ButtonDefault title='Save' onClick={saveChange} />
              <ButtonDefault title='Cancel' onClick={() => setEditable(!editable)} />
            </div>
          ) : (
            <ButtonDefault title='Edit' onClick={() => setEditable(!editable)} />
          )}
        </div>
      </div>

      {/* region de la imagen y la descripcion  */}
      <div className='w-[45%] ml-4  mt-7'>
        <ImagePreview editable={editable} imagenPreview={imagenPreview} setImagenPreview={setImagenPreview} setSelectedClient={setSelectedClient} />
        <InputEdit label={'Ganancia Empleado %'} value={selectedClient.profitEmployee} edit={!editable} inputChange={handleInputChange} type={'number'} name={'profitEmployee'} />
        <InputEdit label={'Ganancia Salon %'} value={selectedClient.profitSaloon} edit={!editable} inputChange={handleInputChange} type={'number'} name={'profitSaloon'} />

        <div className='mt-0 w-full '>
          <label className='block text-xs font-semibold text-gray-600'>
            Descripcion:
            <textarea
              value={selectedClient?.description}
              onChange={handleInputChange}
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

export default ClientDetail
