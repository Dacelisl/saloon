const Spinner = () => {
  /* usar flex absolute top-[40%] left-[50%] */
  return (
    <div className='flex relative h-20 w-20 backdrop-blur-md -translate-x-1/2 -translate-y-1/2'>
      <div className=' animate-ping absolute inline-flex mt-1 ml-1 h-[90%] w-[90%] rounded-full bg-sky-600 opacity-75'></div>
      <div className=' animate-ping absolute inline-flex mt-3 ml-3 h-[70%] w-[70%] rounded-full bg-sky-400 opacity-75'></div>
      <div className=' animate-ping absolute inline-flex  mt-5 ml-5 h-[50%] w-[50%] rounded-full bg-sky-300 opacity-75'></div>
      <div className=' animate-ping absolute inline-flex mt-7 ml-7 h-[30%] w-[30%] rounded-full bg-sky-300 opacity-75'></div>
      <div className=' animate-ping absolute inline-flex mt-9 ml-9 h-[10%] w-[10%] rounded-full bg-sky-200 opacity-75'></div>
      <div className=' animate-ping absolute inline-flex mt-[37px] ml-[38px] h-[6%] w-[6%] rounded-full bg-sky-50 opacity-75'></div>
    </div>
  )
}
export default Spinner
