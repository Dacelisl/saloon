/* eslint-disable react/prop-types */
import { useState } from 'react'

const SearchClient = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSearchClick = () => {
    onSearch(searchTerm)
  }
  return (
    <div className={`flex items-center p-0 `}>
      <input type='text' placeholder='Buscar...' className=' w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-red-200' onChange={handleInputChange} value={searchTerm} />
      <button className='text-button-primary bg-transparent hover:text-button-hover   ml-2 pt-1 focus:outline-none' onClick={handleSearchClick}>
        <ion-icon name='search-circle' size='large'></ion-icon>
      </button>
    </div>
  )
}
export default SearchClient
