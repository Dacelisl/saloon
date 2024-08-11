/* eslint-disable react-refresh/only-export-components */
import { useState, useContext, useEffect, lazy } from 'react'
import { getEmployee, updateEmployee } from '../../firebase/firebase'
import WithAuthentication from '../utils/WithAuthentication.jsx'
import { customContext } from '../context/CustomContext.jsx'
const InputSearch = lazy(() => import('../utils/InputSearch.jsx'))
const Modal = lazy(() => import('../utils/Modal.jsx'))
const EmployeeDetail = lazy(() => import('./EmployeeDetail.jsx'))
const EmployeeTable = lazy(() => import('./EmployeeTable.jsx'))

const EmployeeList = () => {
  const { employees, setEmployees, handleSearch, roles, showToast } = useContext(customContext)

  const [search, setSearch] = useState('')
  const [imagenPreview, setImagenPreview] = useState('')
  const [selectedEmployee, setSelectedEmployee] = useState('')
  const [editable, setEditable] = useState(false)

  useEffect(() => {
    const selected = employees.sort((a, b) => new Date(b.dateBirthday) - new Date(a.dateBirthday))
    if (selected.length > 0) {
      setSelectedEmployee(selected[0])
      setImagenPreview(selected[0].thumbnail)
    }
  }, [employees])

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
