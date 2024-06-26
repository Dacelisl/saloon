// eslint-disable-next-line react/prop-types
const ButtonIcon = ({ title, nameIcon, sizeIcon, className, ...others }) => {
  return (
    <>
      <button
        className={`bg-button-primary flex w-auto text-center items-center px-2 py-0 rounded-md font-normal text-sm xxl:text-base  xxl:font-semibold text-button-text_primary  hover:bg-button-hover hover:text-button-text_hover focus:outline-none focus:ring-1 enabled:active:transform enabled:active:translate-y-px disabled:opacity-75 ${className}`}
        {...others}
      >
        {nameIcon ? (
          <span className='inline-flex relative  left-[-10%]'>
            <ion-icon name={nameIcon} size={sizeIcon}></ion-icon>
          </span>
        ) : (
          <></>
        )}
        <span className='p-1'>{title}</span>
      </button>
    </>
  )
}
export default ButtonIcon
