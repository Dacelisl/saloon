/* eslint-disable react/prop-types */
import { useState } from 'react'
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'

const Tabla = ({ data, onPersonaSeleccionada }) => {
  const columns = [
    {
      header: 'Nombre',
      accessorFn: (row) => `${row.firstName} ${row.lastName}`,
      footer: 'Nombre',
    },
    {
      header: 'Cel',
      accessorFn: (row) => `${row.phone}`,
    },
    {
      header: 'Email',
      accessorFn: (row) => `${row.email}`,
      footer: 'Email',
    },
    {
      header: 'Cumpleaños',
      accessorFn: (row) => `${row.dateBirthday}`,
      footer: 'Cumpleaños',
    },
  ]
  const [sorting, setSorting] = useState([])

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
      <table className='table-auto w-full rounded-md shadow-md'>
        <thead className='bg-gray-500 text-white'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className='text-left'>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className='py-2 px-4 border-b border-gray-600 hover:bg-gray-600 cursor-pointer' onClick={header.column.getToggleSortingHandler()}>
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{ asc: '⬆️', desc: '⬇️' }[header.column.getIsSorted() ?? null]}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} onClick={() => onPersonaSeleccionada(row.original)} className='hover:bg-gray-200 transition-all duration-150'>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className='py-2 px-4 border-b border-gray-200'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot className='bg-gray-700 text-white'>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id} className='text-left'>
              {footerGroup.headers.map((header) => (
                <th key={header.id} className='py-2 px-4 border-b border-gray-600'>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </>
  )
}

export default Tabla
