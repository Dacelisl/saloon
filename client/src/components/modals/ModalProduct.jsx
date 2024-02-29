import { useState, useEffect } from 'react'
import { registerProduct, getCategories, getProviders } from '../../firebase/firebase'
import { resizeAndCompress } from '../../utils/utils'

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024
const ModalProduct = () => {
  const [productData, setProductData] = useState({
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
  })
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

  const handleImagenChange = async (event) => {
    const file = event.target.files[0]
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
      if (!allowedTypes.includes(file.type)) {
        alert('Solo se permiten archivos de imagen (JPEG, PNG, GIF).')
        return
      }
      if (file.size > MAX_IMAGE_SIZE_BYTES) {
        alert('La imagen es demasiado grande. Por favor, selecciona una imagen más pequeña.')
        return
      }
      const resizedImageBlob = await resizeAndCompress(file)
      setImagenPreview(URL.createObjectURL(resizedImageBlob))
      setProductData({
        ...productData,
        ['thumbnail']: resizedImageBlob,
      })
    }
  }
  const handleAddUser = async (e) => {
    e.preventDefault()
    try {
      const res = await registerProduct(productData)
      if (res === 201) {
        console.log('se almaceno correctamente ')
      } else {
        console.log('error en la carga')
      }
    } catch (error) {
      throw new Error('Unhandled Error:', error)
    }
  }

  return (
    <div className='fixed inset-0 flex items-center top-[-5%] md:top-0 justify-center bg-gray-500 bg-opacity-75'>
      <div className='bg-white p-6 max-w-md mx-auto rounded-lg shadow-lg'>
        <h2 className='text-xl pl-4 font-bold mb-1'>New Product</h2>
        <div className='flex flex-wrap justify-between mb-1'>
          <div className='w-[50%]'>
            <div className=' p-4 mb-1 rounded-md'>
              <div className=' mb-1'>
                <label className='block text-sm font-semibold text-gray-600'>
                  Nombre:
                  <input value={productData.name} onChange={handleInputChange} type='text' autoComplete='off' name='name' className='w-full px-3 py-1 border rounded-md' />
                </label>
              </div>
              <div className='mb-3'>
                <label className='block text-sm font-semibold text-gray-600'>
                  Proveedor:
                  <select name='provider' value={productData.provider} onChange={handleInputChange} className='w-full px-3 py-1 border rounded-md'>
                    {providers.map((provider) => (
                      <option key={provider.id} value={provider.name}>
                        {provider.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className='mb-3'>
                <label className='block text-sm font-semibold text-gray-600'>
                  Categoria:
                  <select name='category' value={productData.category} onChange={handleInputChange} className='w-full px-3 py-1 border rounded-md'>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className='mb-3'>
                <label className='block text-sm font-semibold text-gray-600'>
                  Codigo:
                  <input value={productData.code} onChange={handleInputChange} type='text' autoComplete='off' name='code' className='w-full px-3 py-1 border rounded-md' />
                </label>
              </div>
              <div className='mb-3'>
                <label className='block text-sm font-semibold text-gray-600'>
                  Stock:
                  <input value={productData.stock} onChange={handleInputChange} type='number' autoComplete='off' name='stock' className='w-full px-3 py-1 border rounded-md' />
                </label>
              </div>
              <div className='mb-3'>
                <label className='block text-sm font-semibold text-gray-600'>
                  Ganancia Empleado:
                  <input value={productData.profitEmployee} onChange={handleInputChange} type='number' autoComplete='off' name='profitEmployee' className='w-full px-3 py-1 border rounded-md' />
                </label>
              </div>
            </div>
          </div>
          <div className='w-[45%] ml-4  mt-9'>
            <div className='border p-4 mb-2 h-[190px]  rounded-md'>
              <label className='block text-gray-300 text-sm font-bold mb-2 cursor-pointer' htmlFor='imagen'>
                <img
                  id='imagen-preview'
                  src={imagenPreview}
                  alt='Click para cargar imagen'
                  className='w-auto max-h-40  text-center m-auto bg-center bg-cover cursor-pointer'
                  onClick={(e) => {
                    e.stopPropagation()
                    document.getElementById('uploadImage').click()
                  }}
                />
              </label>
              <input type='file' name='thumbnail' id='uploadImage' className='hidden' onChange={handleImagenChange} />
            </div>
            <div className='mb-3'>
              <label className='block text-sm font-semibold text-gray-600'>
                Precio:
                <input value={productData.price} onChange={handleInputChange} type='number' autoComplete='off' name='price' className='w-full px-3 py-1 border rounded-md' />
              </label>
            </div>
            <div className='mb-3'>
              <label className='block text-sm font-semibold text-gray-600'>
                Ganancia Salon:
                <input value={productData.profitSaloon} onChange={handleInputChange} type='number' autoComplete='off' name='profitSaloon' className='w-full px-3 py-1 border rounded-md' />
              </label>
            </div>
          </div>
          <div className='pl-4 mt-0 w-full '>
            <label className='block text-sm font-semibold text-gray-600'>
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
        </div>

        <div className='flex flex-wrap justify-end mt-4'>
          <button
            type='button'
            /* onClick={onClose} */
            className='px-4 py-2 text-sm font-medium text-gray-500 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500'
          >
            Cancelar
          </button>
          <button
            type='submit'
            /* disabled={send}*/
            onClick={handleAddUser}
            className='ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500'
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalProduct
