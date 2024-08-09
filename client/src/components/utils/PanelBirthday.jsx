import { useContext, useState } from 'react'
import { customContext } from '../context/CustomContext'

const PanelBirthday = () => {
  const { nextBirthDay } = useContext(customContext)
  const [selectedRow, setSelectedRow] = useState(null)

  const handleRowClick = (index) => {
    setSelectedRow(index)
  }
  return (
    <div className='z-50 flex relative justify-center mt-[5%] '>
      <div className='absolute h-[30vh] w-full grid bg-[#373938b5] p-4 rounded-2xl shadow-md shadow-slate-100'>
        <span className='pb-4 font-semibold text-lg text-center text-slate-100'>Proximos Cumpleaños</span>
        <div className='text-justify overflow-y-scroll '>
          <ul className='text-justify text-base font-normal'>
            {nextBirthDay
              ? nextBirthDay.map((item) => (
                  <li
                    onClick={() => handleRowClick(`${item.id}`)}
                    className={`flex justify-between border-solid border-b-2  border-slate-500 text-slate-100 ${selectedRow === `${item.id}` ? 'bg-[#4c7775]' : ''}`}
                    key={item.id}
                  >
                    <span className=' pl-1'>{`${item.name}  `}</span>
                    <span className=' text-center'>{item.date}</span>
                  </li>
                ))
              : ''}
          </ul>
        </div>
      </div>
    </div>
  )
}
export default PanelBirthday
