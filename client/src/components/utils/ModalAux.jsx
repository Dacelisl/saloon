// eslint-disable-next-line react/prop-types
const ModalAux = ({ open, close, children }) => {
  return (
    <>
      <div className={` ${open ? 'block' : 'hidden'}`}>
        <div className='fixed w-full h-full top-0 backdrop-blur-md bg-[#3636365c] left-0 right-0 bottom-0 '>
          <div className='flex relative justify-center top-1/4'>
            <div className='absolute w-[90%] md:w-auto xl:w-[40%] xxl:w-[35%] xxxl:w-[30%]min-h-min items-center grid bg-primary-light p-6 pb-3 rounded-2xl shadow-xl shadow-slate-800'>
              <span className=' absolute right-4 top-1 text-lg text-slate-700 cursor-pointer hover:text-slate-400' onClick={close}>
                X
              </span>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalAux
