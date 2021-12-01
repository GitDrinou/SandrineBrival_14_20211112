import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import EmployeesTable from "../components/common/EmployeesTable"
import { fetchEmployees } from "../store/slices/employeeSlice"
import Select from 'react-select'
import { numberOfItems } from '../utils/constants'
import '../sass/employees.scss'

function EmployeesList() {

    let employees = []
    let firstItem = 0

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [defaultNumberItems, setDefaultNumberItems] = useState(numberOfItems[0].value)

    useEffect(() => {
        dispatch(fetchEmployees())
    },[dispatch])

    const store_employees = useSelector(state => state.employee.employees)

    for (let i in store_employees) {

        let index = store_employees.indexOf(store_employees[i])
        
        if ( index < firstItem + defaultNumberItems ) {
           employees.push(store_employees[i])
        }            
    }

    const handleNumberItemChanged = (e) => { setDefaultNumberItems(e.value)}

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
                    {/* 
                        PREVIOUS : <i class="fas fa-caret-left"></i> 
                        NEXT : <i class="fas fa-caret-right"></i>            
                    */}
                    <div className="row">
                        <div className="col-4 mt-3 mb-3 d-flex">
                            <span className="pe-2 my-auto">Showing</span>
                            <Select options={numberOfItems} className="sel-numberItems" defaultValue={numberOfItems[0]} onChange={handleNumberItemChanged} />
                        </div>
                    </div>                        
                    <EmployeesTable employees={employees} />         
                </div>
            </div>
        </div>
    )
}

export default EmployeesList