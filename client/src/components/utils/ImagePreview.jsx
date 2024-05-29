/* eslint-disable react/prop-types */

import { resizeAndCompress } from '../../utils/utils.js'

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024
const ImagePreview = ({ setSelectedItem, imagenPreview, setImagenPreview, toast, labelName = 'Subir imagen', editable = false, showInputOnly = false, className }) => {
  const handleImagenChange = async (event) => {
    const file = event.target.files[0]
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
      if (!allowedTypes.includes(file.type)) {
        toast('Archivos permitidos (JPEG, PNG, GIF).', 500)
        return
      }
      if (file.size > MAX_IMAGE_SIZE_BYTES) {
        toast('Imagen muy grande. selecciona una más pequeña.', 500)
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
    <div
      id='containerImage'
      className={` ${
        imagenPreview !== ''
          ? `flow relative items-end content-center mx-auto sm:w-fit sm:h-fit sm:p-0 sm:mb-1 sm:mt-3 lg:p-0 lg:mt-0 lg:mb-4 lg:w-auto border rounded-md bg-white ${className}`
          : 'flow relative items-end content-center mx-auto sm:mb-1 sm:mt-3 lg:p-0 lg:mt-0 lg:mb-4 h-[23vh] border rounded-md bg-white '
      }  `}
    >
      <label htmlFor='uploadImage' className='block p-2 m-auto text-gray-300 text-sm font-bold cursor-pointer'>
        {imagenPreview ? <img className={`h-[85%] -mt-1 mx-auto object-contain `} src={imagenPreview} alt='Imagen del producto' /> : ''}
        <input type='file' name='thumbnail' id='uploadImage' className='hidden' onChange={handleImagenChange} disabled={!editable} />
        {!imagenPreview && <div className='cursor-pointer m-auto flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>Subir imagen</div>}
      </label>
    </div>
  )
}

export default ImagePreview
