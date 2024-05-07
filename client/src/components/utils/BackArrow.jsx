import { useContext } from 'react'
import { customContext } from '../context/CustomContext'
import backArrow from '../../assets/Icons/backArrow.svg'

const BackArrow = () => {
  const { navigate, location } = useContext(customContext)
  const handleClick = () => {
    navigate(-1)
  }
  const isHomePage = location.pathname === '/' || location.key === 'default'

  return (
    <>
      {!isHomePage && (
        <div className='z-50 cursor-pointer block absolute  left-[2%] sm:w-14 sm:top-[4%] md:top-0 lg:top-[4%] xl:w-16 xxl:w-20 xxl:left-[5%] xxxl:top-[5%]' onClick={handleClick}>
          <span className='text-2xl text-center'>
            <img className='p-1 ' src={`${backArrow}`} alt='to Back' />
          </span>
        </div>
      )}
    </>
  )
}

export default BackArrow
