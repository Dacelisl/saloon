/* eslint-disable react/prop-types */

import { resizeAndCompress } from '../../utils/utils.js'

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024
const ImagePreview = ({ editable = false, setSelectedItem, imagenPreview, setImagenPreview, style = 'h-[130px]' }) => {
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
      setSelectedItem((prevFields) => ({
        ...prevFields,
        ['thumbnail']: resizedImageBlob,
      }))
    }
  }
  return (
    <div className={`flow relative content-center  p-0 pt-1 mx-auto mb-5 w-[80%] ${imagenPreview? 'mt-2':'rounded-md border bg-white '} ${style}`}>
      <label htmlFor='uploadImage' className='block m-auto text-gray-300 text-sm font-bold cursor-pointer xl:w-max'>
        {imagenPreview ? (
          <img className=' text-center m-auto rounded-md bg-center bg-cover cursor-pointer' src={imagenPreview} alt='Imagen del producto' />
        ) : (
          <span className='cursor-pointer  flex text-center p-3 m-3 border-2 border-gray-300 border-dashed rounded-md'>Subir imagen</span>
        )}
        <input type='file' name='thumbnail' id='uploadImage' className='hidden' onChange={handleImagenChange} disabled={!editable} />
      </label>
    </div>
  )
}

export default ImagePreview
