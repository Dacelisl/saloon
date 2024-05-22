/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { GenericTable } from '../../imports.js'

const HistoricalClientTable = ({ data, onClientSelected }) => {
  const [selectedColumnId, setSelectedColumnId] = useState(null)
  const [transformedData, setTransformedData] = useState([])

  useEffect(() => {
    function transform() {
      const newData = (data || []).flatMap((ticket) => {
        return ticket.items?.map((item, index, array) => ({
          ...ticket,
          item: item,
          isLastItem: index === array.length - 1,
        }))
      })
      setTransformedData(newData)
    }
    transform()
  }, [data])

  function changeClientSelected(rowSelected) {
    onClientSelected(rowSelected.original)
    setSelectedColumnId(rowSelected.id)
  }

  const columns = [
    {
      header: 'Ticket',
      accessorFn: (row) => `${row.ticketNumber}`,
    },
    {
      header: 'Fecha',
      accessorFn: (row) => `${row.purchaseDate}`,
    },
    {
      header: 'Servicio/Producto',
      accessorFn: (row) => row.item.name,
    },
    {
      header: 'Empleado',
      accessorFn: (row) => `${row.employee.firstName} ${row.employee.lastName}`,
    },
    {
      header: 'Total',
      accessorFn: (row) => `$ ${row.totalPayment}`,
    },
    {
      header: 'Debe',
      cell: ({ row }) =>
        row.original.isLastItem && (
          <button
            className={
              row.original.balanceDue > 0
                ? ' px-2 py-1 text-sm font-medium bg-button-alert text-button-text_primary hover:text-button-text_hover focus:bg-button-hover_alert rounded-md focus:outline-1 focus:ring-1 focus:ring-gray-500'
                : ''
            }
            onClick={() => changeClientSelected(row)}
          >
            {row.original.balanceDue > 0 ? `$ ${row.original.balanceDue}` : ''}
          </button>
        ),
    },
  ]

  return (
    <>
      <GenericTable data={transformedData} columns={columns} selectedRowId={selectedColumnId} setRowSelected={onClientSelected} />
    </>
  )
}
export default HistoricalClientTable
