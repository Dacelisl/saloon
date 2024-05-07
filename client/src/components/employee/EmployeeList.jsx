/* eslint-disable react/prop-types */
import { useState, useEffect, lazy, useContext } from 'react'
import { customContext } from '../context/CustomContext'
import { getEmployee, updateEmployee } from '../../firebase/firebase'
const EmployeeTable = lazy(() => import('./EmployeeTable'))
const EmployeeDetail = lazy(() => import('./EmployeeDetail'))
const InputSearch = lazy(() => import('../utils/InputSearch'))
const Modal = lazy(() => import('../utils/Modal'))

const EmployeeList = () => {
  const { employeeDefaultList, employees, setEmployees, selectedEmployee, setSelectedEmployee, handleSearch, showToast } = useContext(customContext)

  const [search, setSearch] = useState('')
  const [imagenPreview, setImagenPreview] = useState('')
  const [editable, setEditable] = useState(false)

  useEffect(() => {
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
    setSelectedEmployee(employeeDefaultList)
    if (res.code > 200) return showToast('Cambios NO Guardados ', res.code)
    showToast('Se guardaron los cambios ', res.code)
  }

  const handleSearchEmployee = (searchTerm) => {
    setSearch(handleSearch(searchTerm, employees))
  }

  return (
    <>
      <Modal type={2} className={' h-3/4 md:h-[90%]  xl:h-[80%] xl:w-[70%] xxl:h-[90%] xxxl:h-auto xxl:w-auto xxxl:w-[60%] overflow-auto'}>
        <h2 className='text-xl text-center mb-3 text-gray-500 font-bold'>Empleados</h2>
        <EmployeeDetail
          selectedEmployee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
          imagenPreview={imagenPreview}
          setImagenPreview={setImagenPreview}
          editable={editable}
          setEditable={setEditable}
          saveChange={saveChange}
        />
        <InputSearch onSearch={handleSearchEmployee} />
        <EmployeeTable onEmployeeSelected={handleSelect} data={search !== '' ? search : employees} />
      </Modal>
    </>
  )
}

export default EmployeeList
