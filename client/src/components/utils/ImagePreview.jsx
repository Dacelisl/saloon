/* eslint-disable react/prop-types */

import { resizeAndCompress } from '../../utils/utils.js'

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024
const ImagePreview = ({ editable, setSelectedProduct, imagenPreview, setImagenPreview }) => {
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
      setSelectedProduct((prevFields) => ({
        ...prevFields,
        ['thumbnail']: resizedImageBlob,
      }))
    }
  }
  return (
    <div className='border p-4 pt-1 mx-auto mb-3 w-[80%] h-[130px]  rounded-md bg-white'>
      <label htmlFor='uploadImage' className='block text-gray-300 text-sm font-bold mb-2 cursor-pointer'>
        {imagenPreview ? <img className='w-auto max-h-40  text-center m-auto bg-center bg-cover cursor-pointer' src={imagenPreview} alt='Imagen del producto' /> : ''}
        <input type='file' name='thumbnail' id='uploadImage' className='hidden' onChange={handleImagenChange} disabled={!editable} />
        <label className={imagenPreview ? 'hidden' : 'cursor-pointer mt-5 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'}>Subir imagen</label>
      </label>
    </div>
  )
}

export default ImagePreview
