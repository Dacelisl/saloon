import { useEffect, useState } from 'react'
import InformacionPersonal from './InformacionPersonal'
import Tabla from './Tabla'
import { getClients } from '../../firebase/firebase'
const ClientAll = () => {
  const [personas, setPersonas] = useState([])
  const [personaSeleccionada, setPersonaSeleccionada] = useState(null)

  useEffect(() => {
    async function getAll() {
      const listPersonas = await getClients()
      
      setPersonas(listPersonas)
    }
    getAll()
  }, [])

  const handlePersonaSeleccionada = (persona) => {
    setPersonaSeleccionada(persona)
  }
  return (
    <div className='container mx-auto'>
      <div className='flex flex-col'>
        <div className='flex-1'>{personaSeleccionada ? <InformacionPersonal persona={personaSeleccionada} /> : <></>}</div>
        <div className='flex-1'>{personas.length > 0 ? <Tabla data={personas} onPersonaSeleccionada={handlePersonaSeleccionada} /> : <></>}</div>
      </div>
    </div>
  )
}

export default ClientAll
