/* eslint-disable react/prop-types */

import { resizeAndCompress } from '../../utils/utils.js'
import { useEffect, useRef } from 'react'

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024
const ImagePreview = ({ setSelectedItem, imagenPreview, setImagenPreview, labelName = 'Subir imagen', editable = false, showInputOnly = false, className = 'h-[130px]' }) => {
  const cropperRef = useRef(null)

  useEffect(() => {
    if (cropperRef.current && imagenPreview) {
      cropperRef.current.replace(imagenPreview)
    }
  }, [imagenPreview])

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
      if (setImagenPreview !== undefined) {
        setImagenPreview(URL.createObjectURL(resizedImageBlob))
      }
      const customEvent = {
        target: {
          name: 'thumbnail',
          value: resizedImageBlob,
        },
      }
      setSelectedItem(customEvent)
    }
  }

  if (showInputOnly) {
    return (
      <>
        <div className='mb-2'>
          <label htmlFor={'thumbnail'} className='block text-xs lg:text-base xxl:text-lg  mb-1 font-semibold text-gray-600'>
            {labelName}:
          </label>
          <input
            id={'thumbnail'}
            disabled={editable}
            onChange={handleImagenChange}
            type={'file'}
            autoComplete='off'
            name={'thumbnail'}
            className={`w-full px-2 py-0 border rounded-md focus:outline-red-200 ${className}`}
          />
        </div>
      </>
    )
  }

  return (
    <div className={`flow relative content-center p-0 pt-1 mx-auto mb-5 w-[80%] ${imagenPreview ? 'mt-2' : 'rounded-md border bg-white '} ${className}`}>
      {imagenPreview ? (
        <img className='text-center m-auto rounded-md ' style={{ objectFit: 'contain' }} src={imagenPreview} alt='Imagen del producto' />
      ) : (
        <div className='cursor-pointer flex text-center p-3 m-3 border-2 border-gray-300 border-dashed rounded-md'>{labelName}</div>
      )}
      <input type='file' name='thumbnail' id='uploadImage' className='hidden' onChange={handleImagenChange} disabled={!editable} />
    </div>
  )
}

export default ImagePreview
