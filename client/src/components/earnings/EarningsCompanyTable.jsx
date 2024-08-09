/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'

const EarningsCompanyTable = ({ data }) => {
  const [totalEmployee, setTotalEmployee] = useState('')
  const [totalCompany, setTotalCompany] = useState('')
  const [selectedRow, setSelectedRow] = useState(null)

  useEffect(() => {
    const formatCurrency = () => {
      const amountEmployee = data.reduce((total, earning) => total + parseFloat(earning.totalEarnings), 0).toFixed(2)
      const amountCompany = data.reduce((total, earning) => total + parseFloat(earning.totalEarningsCompany), 0).toFixed(2)
      setTotalCompany(new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(amountCompany))
      setTotalEmployee(new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(amountEmployee))
    }
    formatCurrency()
  }, [data])

  const handleRowClick = (index) => {
    setSelectedRow(index)
  }

  return (
    <>
      <div className='block w-full px-2 pt-2 pb-4 rounded-md'>
        <div className='text-justify border-double border-2 border-gray-200 overflow-x-auto'>
          <table className='w-full text-sm table-fixed'>
            <thead className='bg-[#d0cfc9]'>
              <tr>
                <th className='w-1/4 pl-1 text-left'>Fecha</th>
                <th className='w-1/4 text-center'>Empleado</th>
                <th className='w-1/4 text-center'>Total Empleado</th>
                <th className='w-1/4 text-right pr-3'>Total Empresa</th>
              </tr>
            </thead>
            <tbody>
              {data.map((earning, index) => (
                <tr key={`${index}`} onClick={() => handleRowClick(`${index}`)} className={`border-solid border-b-2 border-gray-200 ${selectedRow === `${index}` ? 'bg-[#a1b99a]' : ''}`}>
                  <td className='w-1/4 pl-1'>{earning.date}</td>
                  <td className='w-1/4 text-center'>{`${earning.employee.firstName} ${earning.employee.lastName}`}</td>
                  <td className='w-1/4 text-center'>{earning.totalEarnings}</td>
                  <td className='w-1/4 text-right pr-3'>{earning.totalEarningsCompany}</td>
                </tr>
              ))}
              <tr className='w-full bg-secondary-light'>
                <td className='py-1 text-right pr-4 text-base font-medium' colSpan={2}>
                  Totales:
                </td>
                <td className='py-1 text-center mr-2 font-medium'>{totalEmployee}</td>
                <td className='py-1 text-right mr-2 font-medium'>{totalCompany}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
export default EarningsCompanyTable
