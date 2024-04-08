/* eslint-disable react/prop-types */
import { useState } from 'react'
import GenericTable from '../utils/GenericTable.jsx'

const ClientTable = ({ data, onClientSelected }) => {
  
  const [selectedColumnId, setSelectedColumnId] = useState(null)

  const columns = [
    {
      header: 'Nombre',
      accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    },
    {
      header: 'Últ. Servicio',
      accessorFn: (row) => (row.serviceHistory.length > 0 ? row.serviceHistory[row.serviceHistory.length-1].service.name :'N/A'),
    },
    {
      header: 'Fecha',
      accessorFn: (row) => (row.shopping.length > 0 ? row.shopping[row.shopping.length-1]?.date : row.serviceHistory[row.serviceHistory.length-1]?.date || 'N/A'),
    },
    {
      id: 'more-details',
      header: () => <span></span>,
      cell: ({ row }) => (
        <button
          className={`px-2 py-1 text-sm font-medium bg-button-primary text-button-text_primary hover:text-button-text_hover focus:bg-button-hover rounded-md focus:outline-1 focus:ring-1 focus:ring-gray-500 `}
          onClick={() => setSelectedColumnId(row.id)}
        >
          Detalles
        </button>
      ),
    },
  ]

  return (
    <>
      <GenericTable data={data} setRowSelected={onClientSelected} columns={columns} selectedRowId={selectedColumnId} />
    </>
  )
}
export default ClientTable
