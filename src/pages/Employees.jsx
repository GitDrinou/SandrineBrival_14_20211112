import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import EmployeesTable from "../components/common/EmployeesTable"
import { fetchEmployees } from "../store/slices/employeeSlice"
import '../sass/employees.scss'

function EmployeesList() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchEmployees())
    },[dispatch])

    const store_employees = useSelector(state => state.employee.employees)

    return (
        <div className="container w-100 p-3">
            <div className="row mb-2">
                <div className="col d-flex justify-content-end">
                    <span className="icoBack" onClick={() => navigate(-1)}>
                        <i className="fas fa-angle-left" title="Go to dashboard"></i>
                        return
                    </span>
                    
                </div>
            </div>
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