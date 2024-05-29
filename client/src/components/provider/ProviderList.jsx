/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useState, useContext } from 'react'
import { updateProvider } from '../../firebase/firebase'
import { customContext } from '../context/CustomContext.jsx'
import { WithAuthentication, ProviderTable, ProviderDetail, InputSearch, Modal } from '../imports.js'
const providerDefault = {
  name: '',
  description: '',
  address: '',
  city: '',
  paymentTerms: '',
  contact: {
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    address: '',
    email: '',
    dateBirthday: '',
    thumbnail: '',
  },
}

const ProviderList = () => {
  const { providers, handleSearch, fetchFromDatabase, showToast } = useContext(customContext)
  const [selectedProvider, setSelectedProvider] = useState(providerDefault)
  const [search, setSearch] = useState('')
  const [imagenPreview, setImagenPreview] = useState('')
  const [editable, setEditable] = useState(false)

  const handleProviderSelect = (providerId) => {
    setSelectedProvider(providerId)
    setImagenPreview(providerId.contact.thumbnail)
  }

  const saveChange = async () => {
    const res = await updateProvider(selectedProvider)
    setEditable(false)
    await fetchFromDatabase()
    setSelectedProvider(providerDefault)
    setImagenPreview('')
    if (res.code !== 200) return showToast('Cambios NO Guardados ', res.code)
    showToast('Se guardaron los cambios ', res.code)
  }

  const handleSearchInProvider = (searchTerm) => {
    setSearch(handleSearch(searchTerm, providers))
  }
  return (
    <>
      <Modal type={2} className={'md:h-[85%] md:top-[3%] lg:top-[5%] lg:h-[88%] xl:!top-[3%] xl:!h-[85%] xxl:!h-[90%]'}>
        <h2 className='text-xl text-center mb-3 text-gray-500 font-bold'>Proveedores</h2>
        <ProviderDetail
          selectedprovider={selectedProvider}
          setSelectedProvider={setSelectedProvider}
          imagenPreview={imagenPreview}
          setImagenPreview={setImagenPreview}
          editable={editable}
          setEditable={setEditable}
          saveChange={saveChange}
          toast={showToast}
        />
        <InputSearch onSearch={handleSearchInProvider} />
        <div className='h-[30%]'>
          <ProviderTable onProviderSelected={handleProviderSelect} data={search !== '' ? search : providers} />
        </div>
      </Modal>
    </>
  )
}
export default WithAuthentication(['admin'])(ProviderList)
