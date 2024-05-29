/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useState, useContext } from 'react'
import { customContext } from '../context/CustomContext'
import { getEmployee, updateEmployee } from '../../firebase/firebase'
import { WithAuthentication, EmployeeTable, EmployeeDetail, InputSearch, Modal } from '../imports.js'

const EmployeeList = () => {
  const { employees, setEmployees, handleSearch, roles, showToast } = useContext(customContext)

  const [search, setSearch] = useState('')
  const [imagenPreview, setImagenPreview] = useState('')
  const [selectedEmployee, setSelectedEmployee] = useState('')
  const [editable, setEditable] = useState(false)

  const handleSelect = (userId) => {
    setSelectedEmployee(userId)
    setImagenPreview(userId?.thumbnail || '')
  }

  const saveChange = async () => {
    const res = await updateEmployee(selectedEmployee)
    setEditable(false)
    const employeeUpdate = await getEmployee()
    setEmployees(employeeUpdate)
    setSelectedEmployee('')
    if (res.code !== 200) showToast('Cambios NO Guardados ', res.code)
    showToast('Se guardaron los cambios ', 200)
  }

  const handleSearchEmployee = (searchTerm) => {
    setSearch(handleSearch(searchTerm, employees))
  }

  return (
    <>
      <Modal type={2} className={'!py-6 md:h-[85%] md:top-[3%] lg:top-[5%] lg:h-[88%] xl:!top-[3%] xl:!h-[85%] xxl:!h-[90%]'}>
        <h2 className='text-xl text-center mb-3 text-gray-500 font-bold'>Empleados</h2>
        <EmployeeDetail
          selectedEmployee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
          imagenPreview={imagenPreview}
          setImagenPreview={setImagenPreview}
          editable={editable}
          setEditable={setEditable}
          saveChange={saveChange}
          roles={roles}
          toast={showToast}
        />
        <InputSearch onSearch={handleSearchEmployee} />
        <div className='h-[30%]'>
          <EmployeeTable onEmployeeSelected={handleSelect} data={search !== '' ? search : employees} />
        </div>
      </Modal>
    </>
  )
}
export default WithAuthentication(['admin'])(EmployeeList)
