import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { fetchEmployees } from "../store/slices/employeeSlice"
import '../css/employees.css'

import EmployeesTable from '../components/common/EmployeesTable'

/**
 * Component function : Employees List
 * @returns employees list
*/
function EmployeesList() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchEmployees())
    },[dispatch])

    const store_employees = useSelector(state => state.employee.employees)

    return (
        <div className="container w-100 p-3">
            <div className="row">
                <div className="col">
                    <div className="employees--header">
                        <i className="fas fa-list my-auto"></i>
                        <h1>Current Employees</h1>                            
                    </div>                      
                    <EmployeesTable employees={store_employees} />                          
                </div>
            </div>
        </div>
    )
}

export default EmployeesList