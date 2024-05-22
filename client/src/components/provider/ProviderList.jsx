/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from 'react'
import { updateProvider } from '../../firebase/firebase'
import { customContext } from '../context/CustomContext.jsx'
import { WithAuthentication, ProviderTable, ProviderDetail, InputSearch, Modal } from '../imports.js'

const ProviderList = () => {
  const { providerDefault,providers, handleSearch, fetchFromDatabase, showToast } = useContext(customContext)
  const [selectedProvider, setSelectedProvider] = useState(providerDefault)
  const [search, setSearch] = useState('')
  const [imagenPreview, setImagenPreview] = useState('')
  const [editable, setEditable] = useState(false)

  useEffect(() => {
    const selected = providers.find((client) => client.id === selectedProvider.id)
    setImagenPreview(selected?.thumbnail || '')
  }, [providers, selectedProvider])

  const handleProviderSelect = (providerId) => {
    setSelectedProvider(providerId)
  }

  const saveChange = async () => {
    const res = await updateProvider(selectedProvider)
    setEditable(false)
    await fetchFromDatabase()
    setSelectedProvider('')
    if (res.code !== 200) return showToast('Cambios NO Guardados ', res.code)
    showToast('Se guardaron los cambios ', res.code)
  }

  const handleSearchInProvider = (searchTerm) => {
    setSearch(handleSearch(searchTerm, providers))
  }

  return (
    <>
      <Modal type={2} className={' h-3/4 md:h-[90%]  xl:h-[80%] xl:w-[70%] xxl:h-[90%] xxxl:h-[80%] xxl:w-auto xxxl:w-[60%] overflow-auto'}>
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
        <ProviderTable onProviderSelected={handleProviderSelect} data={search !== '' ? search : providers} />
      </Modal>
    </>
  )
}
export default WithAuthentication(['admin'])(ProviderList)
