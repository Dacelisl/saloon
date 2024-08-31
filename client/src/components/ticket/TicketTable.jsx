/* eslint-disable react/prop-types */
import { useState, lazy } from 'react'
const ButtonDefault = lazy(() => import('../utils/ButtonDefault.jsx'))
const GenericTable = lazy(() => import('../utils/GenericTable.jsx'))

const TicketTable = ({ data, onItemSelected, openModal }) => {
  const [selectedColumnId, setSelectedColumnId] = useState(null)


  const showModal = (id) => {
    setSelectedColumnId(id)
    openModal()
  }

  const columns = [
    {
      header: 'Nombre',
      accessorFn: (row) => `${row.name}`,
    },
    {
      header: 'Precio',
      accessorFn: (row) => row.price? row.price : `${row.priceRange.min} - ${row.priceRange.max}`,
    },
    {
      id: 'more-details',
      header: () => <span></span>,
      cell: ({ row }) => (
        <ButtonDefault
          color={'sm:text-xs xxl:font-light lg:p-0 '}
          title='Agregar'
          onClick={() => {
            showModal(row.id)
          }}
        />
      ),
    },
  ]

  return (
    <>
      <GenericTable data={data} setRowSelected={onItemSelected} columns={columns} selectedRowId={selectedColumnId} />
    </>
  )
}
export default TicketTable
