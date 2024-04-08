/* eslint-disable react/prop-types */
import { useState } from 'react'
import GenericTable from '../utils/GenericTable.jsx'
import ButtonDefault from '../utils/ButtonDefault.jsx'

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
