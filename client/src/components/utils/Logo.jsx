/* eslint-disable react/prop-types */
import logo_fabios_copia from '../../assets/img/logo_fabios_copia.svg'

const Logo = () => {
  return (
    <>
      <span id='head' className={`z-30 flex w-full absolute justify-center top-[3%]`}>
        <img className={`sm:w-[45%] lg:w-[40%] xl:w-[30%] xxl:w-[22%] xxxl:w-[15%]`} src={logo_fabios_copia} />
      </span>
    </>
  )
}
export default Logo
