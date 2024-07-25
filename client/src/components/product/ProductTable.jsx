/* eslint-disable react/prop-types */
import { useState, lazy } from 'react'
const GenericTable = lazy(() => import('../utils/GenericTable.jsx'))

const ProductTable = ({ data, onProductSelected }) => {
  const [selectedColumnId, setSelectedColumnId] = useState(null)

  const columns = [
    {
      header: 'Nombre',
      accessorFn: (row) => `${row.name}`,
    },
    {
      header: 'Proveedor',
      accessorFn: (row) => `${row.provider}`,
    },
    {
      header: 'Precio',
      accessorFn: (row) => `${row.price}`,
    },
    {
      header: 'Stock',
      accessorFn: (row) => `${row.stock}`,
    },
    {
      id: 'more-details',
      header: () => <span></span>,
      cell: ({ row }) => (
        <button
          className={`px-2 py-1 text-sm font-medium bg-button-primary text-button-text_primary hover:text-button-text_hover focus:bg-button-hover rounded-md focus:outline-1 focus:ring-1 focus:ring-gray-500 `}
          onClick={() => setSelectedColumnId(row.id)}
        >
          <span className='md:hidden'>Ver</span> <span className='sm:hidden md:block'>Detalles</span>
        </button>
      ),
    },
  ]

  return (
    <>
      <GenericTable data={data} setRowSelected={onProductSelected} columns={columns} selectedRowId={selectedColumnId} />
    </>
  )
}
export default ProductTable
