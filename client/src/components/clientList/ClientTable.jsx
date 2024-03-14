/* eslint-disable react/prop-types */
import { useState } from 'react'
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'

const ClientTable = ({ data, onProductSelected }) => {
  const [selectedColumnId, setSelectedColumnId] = useState(null)
  const [sorting, setSorting] = useState([])

  const columns = [
    {
      header: 'Nombre',
      accessorFn: (row) => `${row.firstName} ${row.lastName}`, // Concatenar el nombre completo
    },
    {
      header: 'Últ. Servicio',
      accessorFn: (row) => (row.serviceHistory.length > 0 ? row.serviceHistory[0].service.name : 'N/A'), // Obtener el nombre del último servicio o 'N/A' si no hay servicios
    },
    {
      header: 'Fecha',
      accessorFn: (row) => (row.shopping.length > 0 ? row.shopping[0].dateShopping : 'N/A'), // Obtener la fecha de la última visita o 'N/A' si no hay visitas
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

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  })

  return (
    <>
      <div className='w-full mt-4 md:mt-0'>
        <div className='bg-primary-light w-auto shadow-md h-40 border-black rounded-md overflow-x-auto'>
          <table className='w-full text-sm text-left text-gray-500 overflow-y-scroll'>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className=' sticky top-0 bg-button-primary text-button-text_primary font-extralight text-sm'>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className='sticky top-0' onClick={header.column.getToggleSortingHandler()}>
                      {header.isPlaceholder ? null : (
                        <div className='px-1 w-max'>
                          {flexRender(header.column.columnDef.header, header.getContext())}

                          {header.column.getIsSorted() && (
                            <span className='ml-1 align-middle text-primary-light font-bold'>
                              <ion-icon name={header.column.getIsSorted() === 'asc' ? 'chevron-up-circle-outline' : 'chevron-down-circle-outline'}></ion-icon>
                            </span>
                          )}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} onClick={() => onProductSelected(row.original)} className={row.id === selectedColumnId ? 'bg-secondary-light' : ''}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className='py-2 px-2 border-b border-gray-300'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
export default ClientTable
