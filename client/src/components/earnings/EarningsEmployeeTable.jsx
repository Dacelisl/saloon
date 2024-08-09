/* eslint-disable react/prop-types */
import { useState } from 'react'

const EarningsEmployeeTable = ({ data }) => {
  const [selectedRow, setSelectedRow] = useState(null) 

  const handleRowClick = (index) => {
    setSelectedRow(index) 
  }

  const formatCurrency = () => {
    const amount = data.reduce((total, earning) => total + parseFloat(earning.totalEarnings), 0).toFixed(2)
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(amount)
  }

  return (
    <div className='block w-full px-2 pt-2 pb-4 rounded-md'>
      <div className='text-justify border-double border-2 border-gray-200 overflow-x-auto'>
        <table className='w-full text-sm overflow-y-scroll'>
          <thead className='bg-[#d0cfc9]'>
            <tr>
              <th className='w-[13%] pl-1'>Fecha</th>
              <th className='w-[11%] pl-1 text-center'>Ticket</th>
              <th className='w-[28%] text-center pl-3'>Cliente</th>
              <th className='w-[29%] text-center pl-1'>Servicio/Producto</th>
              <th className='w-[5%] text-center'>Cantidad</th>
              <th className='w-[14%] text-right pr-3'>Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((earning, index) =>
              earning.earningsDetails.map((detail, idx) => (
                <tr
                  key={`${index}-${idx}`}
                  onClick={() => handleRowClick(`${index}-${idx}`)} 
                  className={`border-solid border-b-2 border-gray-200 ${selectedRow === `${index}-${idx}` ? 'bg-[#a1b99a]' : ''}`}
                >
                  <td className='pl-1'>{earning.date}</td>
                  <td className='pl-1 text-center'>{detail.ticketNumber}</td>
                  <td className='pl-3'>{`${detail.customer.firstName} ${detail.customer.lastName}`}</td>
                  <td className='pl-1 text-center'>{detail.serviceOrProduct}</td>
                  <td className='text-center'>{detail.quantity}</td>
                  <td className='text-right pr-3'>{detail.totalCost}</td>
                </tr>
              ))
            )}
            <tr className='w-full bg-secondary-light'>
              <td className='w-[80%] py-2 text-right pr-9 font-medium' colSpan={5}>
                Total a Pagar:
              </td>
              <td className='w-[20%] py-2 text-right pr-3 font-medium'>{formatCurrency()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EarningsEmployeeTable
