// eslint-disable-next-line react/prop-types
const ButtonIcon = ({ title, nameIcon, sizeIcon, color, ...others }) => {
  return (
    <>
      <button
        style={{ backgroundColor: color }}
        className=' bg-sky-500 flex w-auto text-center items-center px-2 py-2 rounded-md font-medium text-cyan-50 enabled:hover:bg-sky-600 enabled:active:transform enabled:active:translate-y-px disabled:opacity-75'
        {...others}
      >
        {nameIcon ? (
          <span className='text-justify mt-1 px-1'>
            <ion-icon name={nameIcon} size={sizeIcon}></ion-icon>
          </span>
        ) : (
          <></>
        )}
        {title}
      </button>
    </>
  )
}
export default ButtonIcon
