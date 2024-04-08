/* eslint-disable react/prop-types */
import { useState, useRef } from 'react'
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'

const GenericTable = ({ data, columns, selectedRowId, setRowSelected, groupBy = 'ticketNumber' }) => {
  const [sorting, setSorting] = useState([])
  const currentRef = useRef(null)

  const RowStyle = (row) => {
    if (!row.original[groupBy]) return
    const currentValue = currentRef.current
    if (!currentValue || currentValue === row.original[groupBy]) {
      currentRef.current = row.original[groupBy]
      return { backgroundColor: '#dfdbcd' }
    } else {
      return {}
    }
  }

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowStyle: RowStyle,
    debugTable: true,
  })

  return (
    <>
      <div className='w-full mt-2 md:mt-0'>
        <div className='bg-primary-light w-auto shadow-md h-40 border-black rounded-md overflow-x-auto'>
          <table className='w-full text-sm text-center text-gray-500 overflow-y-scroll'>
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
                <tr key={row.id} onClick={() => setRowSelected(row.original)} style={RowStyle(row)} className= {row.id === selectedRowId ? 'bg-secondary-light' : ''}>
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

export default GenericTable