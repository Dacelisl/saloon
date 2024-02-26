/* eslint-disable react/prop-types */

const InformacionPersonal = ({ persona }) => {
  console.log('persona', persona);
  return (
    <div className='bg-white p-4'>
      <h1 className='text-xl font-bold'>{persona.firstName}</h1>
      <p>{persona.lastName}</p>
      <p>{persona.dateBirthday}</p>
      <img src={persona.dni} alt='' />
    </div>
  )
}

export default InformacionPersonal
