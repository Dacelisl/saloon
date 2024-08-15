/* eslint-disable react/prop-types */
const Cube = ({ hiden = false, dark = true }) => {
  return (
    <div className={`${hiden ? 'hidden' : `flex z-[60] fixed inset-0 items-center top-[-5%] md:top-0 justify-center ${dark ? 'bg-black backdrop-blur-xl' : 'bg-[#00000024] '} `}`}>
      <div className='sk-cube-grid w-16 h-16 xl:w-20 xl:h-20 mx-28 my-auto ' id='cube'>
        <div className={`sk-cube sk-cube1 ${dark ? 'bg-[#d9e7cb]' : 'bg-[#9dc279]'}`}></div>
        <div className={`sk-cube sk-cube2 ${dark ? 'bg-[#d9e7cb]' : 'bg-[#9dc279]'}`}></div>
        <div className={`sk-cube sk-cube3 ${dark ? 'bg-[#d9e7cb]' : 'bg-[#9dc279]'}`}></div>
        <div className={`sk-cube sk-cube4 ${dark ? 'bg-[#d9e7cb]' : 'bg-[#9dc279]'}`}></div>
        <div className={`sk-cube sk-cube5 ${dark ? 'bg-[#d9e7cb]' : 'bg-[#9dc279]'}`}></div>
        <div className={`sk-cube sk-cube6 ${dark ? 'bg-[#d9e7cb]' : 'bg-[#9dc279]'}`}></div>
        <div className={`sk-cube sk-cube7 ${dark ? 'bg-[#d9e7cb]' : 'bg-[#9dc279]'}`}></div>
        <div className={`sk-cube sk-cube8 ${dark ? 'bg-[#d9e7cb]' : 'bg-[#9dc279]'}`}></div>
        <div className={`sk-cube sk-cube9 ${dark ? 'bg-[#d9e7cb]' : 'bg-[#9dc279]'}`}></div>
      </div>
    </div>
  )
}

export default Cube
