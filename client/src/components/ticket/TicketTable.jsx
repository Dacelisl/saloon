/* eslint-disable react/prop-types */
import { useState } from 'react'
import { GenericTable, ButtonDefault } from '../imports.js'

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
      accessorFn: (row) => `${row.price}`,
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
