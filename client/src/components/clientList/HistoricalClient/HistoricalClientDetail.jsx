/* eslint-disable react/prop-types */
import { lazy } from 'react'
const ImagePreview = lazy(() => import('../../utils/ImagePreview.jsx'))

const HistoricalClientDetail = ({ selectedClient, ticket }) => {
  return (
    <div className='flex mb-1 border-solid border-2 border-gray-200'>
      <div className='w-[70%]'>
        <div className=' p-4 rounded-md'>
          <div className='text-justify'>
            <ul className='text-justify text-sm'>
              <li className='flex justify-between'>
                Teléfono: <span>{selectedClient.phone}</span>
              </li>
              <li className='flex justify-between'>
                Dirección: <span>{selectedClient.address}</span>{' '}
              </li>
              <li className='flex justify-between'>
                Email: <span>{selectedClient.email}</span>{' '}
              </li>
              <li className='flex justify-between'>
                Cumpleaños: <span>{selectedClient.dateBirthday}</span>{' '}
              </li>
            </ul>
          </div>
        </div>
        {ticket ? (
          <div className='h-[30%] overflow-auto mb-2'>
            <table className='text-center m-auto overflow-scroll'>
              <thead className='bg-button-primary px-4 text-button-text_primary text-xs font-extralight'>
                <tr>
                  <th className='text-center px-2'>Fecha</th>
                  <th className='text-center px-2'>Abono</th>
                  <th className='text-center px-2'>Pago</th>
                </tr>
              </thead>
              <tbody>
                {ticket.partialPayments.map((item) => (
                  <tr key={item.id}>
                    <td className='text-center px-2'>{item.paymentDate}</td>
                    <td className='text-center px-2'>${item.amount}</td>
                    <td className='text-center px-2'>{item.paymentMethod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          ''
        )}
      </div>
      <div className='w-[30%] mt-2'>
        <ImagePreview imagenPreview={selectedClient.thumbnail} className='w-[100px] py-0 px-0' />
      </div>
    </div>
  )
}

export default HistoricalClientDetail
