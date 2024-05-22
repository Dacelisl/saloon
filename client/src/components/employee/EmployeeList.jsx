/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from 'react'
import { customContext } from '../context/CustomContext'
import { getEmployee, updateEmployee } from '../../firebase/firebase'
import { WithAuthentication, EmployeeTable, EmployeeDetail, InputSearch, Modal } from '../imports.js'

const EmployeeList = () => {
  const { employees, setEmployees, handleSearch, showToast } = useContext(customContext)

  const [search, setSearch] = useState('')
  const [imagenPreview, setImagenPreview] = useState('')
  const [selectedEmployee, setSelectedEmployee] = useState('')
  const [editable, setEditable] = useState(false)

  useEffect(() => {
    if (!selectedEmployee) return
    const selected = employees.find((user) => user.id === selectedEmployee.id)
    setImagenPreview(selected?.thumbnail || '')
  }, [employees, selectedEmployee])

  const handleSelect = (userId) => {
    setSelectedEmployee(userId)
  }

  const saveChange = async () => {
    const res = await updateEmployee(selectedEmployee)
    setEditable(false)
    const employeeUpdate = await getEmployee()
    setEmployees(employeeUpdate)
    setSelectedEmployee('')
    if (res.code > 200) return showToast('Cambios NO Guardados ', res.code)
    showToast('Se guardaron los cambios ', res.code)
  }

  const handleSearchEmployee = (searchTerm) => {
    setSearch(handleSearch(searchTerm, employees))
  }

  return (
    <>
      <Modal type={2} className={'!py-6 xl:!top-[3%] xl:!h-[80%]'}>
        <h2 className='text-xl text-center mb-3 text-gray-500 font-bold'>Empleados</h2>
        <EmployeeDetail
          selectedEmployee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
          imagenPreview={imagenPreview}
          setImagenPreview={setImagenPreview}
          editable={editable}
          setEditable={setEditable}
          saveChange={saveChange}
          toast={showToast}
        />
        <InputSearch onSearch={handleSearchEmployee} />
        <EmployeeTable onEmployeeSelected={handleSelect} data={search !== '' ? search : employees} />
      </Modal>
    </>
  )
}
export default WithAuthentication(['admin'])(EmployeeList)
