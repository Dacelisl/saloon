/* eslint-disable react/prop-types */
import { useState } from 'react'
import GenericTable from '../utils/GenericTable.jsx'

const ProviderTable = ({ data, onProviderSelected }) => {
  const [selectedColumnId, setSelectedColumnId] = useState(null)

  const columns = [
    {
      header: 'Empresa',
      accessorFn: (row) => `${row.name}`,
    },
    {
      header: 'Asesor',
      accessorFn: (row) => `${row.contact.firstName} ${row.contact.lastName}`,
    },
    {
      header: 'Contacto',
      accessorFn: (row) => `${row.contact.phone}`
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
      <GenericTable data={data} setRowSelected={onProviderSelected} columns={columns} selectedRowId={selectedColumnId} />
    </>
  )
}
export default ProviderTable
