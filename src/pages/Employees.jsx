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

    const [valSearch, setValSearch] = useState('')
    const [tmpEmployees, setTmpEmployees] = useState([])

    const [defaultNumberItems, setDefaultNumberItems] = useState(numberOfItems[0].value)

    useEffect(() => {
        dispatch(fetchEmployees())
    },[dispatch])

    const store_employees = useSelector(state => state.employee.employees)

    const lenStoreEmployees = store_employees.length
    const lenTmpEmployees = tmpEmployees.length

    let lenEmployeesFiltered = parseInt(defaultNumberItems) > defaultNumberItems ? defaultNumberItems : lenTmpEmployees

    if (valSearch.length < 3) {

        for (let i in store_employees) {
            let index = store_employees.indexOf(store_employees[i])
            
            if ( index < firstItem + defaultNumberItems) {
                employees.push(store_employees[i])
            }            
        }
        
    }
    else {
        for (let tmp in tmpEmployees) {
            for (let emp in store_employees ) {
                if (tmpEmployees[tmp] === store_employees[emp]) {                    
                    employees.push(tmpEmployees[tmp])
                }
            }
        }
    }
   

    const handleNumberItemChanged = (e) => { setDefaultNumberItems(e.value)}

    const handleSearchInputChanged = (e) => { 
        setValSearch(e.target.value)
        let tmpArray = []
        if (valSearch.length + 1 >= 3) {
            tmpArray.push(
                ...store_employees.filter(elt => elt["lastName"].toLowerCase().includes(valSearch)),
                ...store_employees.filter(elt => elt["firstName"].toLowerCase().includes(valSearch)),
                ...store_employees.filter(elt => elt["startDate"].includes(valSearch)),
                ...store_employees.filter(elt => elt["department"].toLowerCase().includes(valSearch)),
                ...store_employees.filter(elt => elt["birthDate"].includes(valSearch)),
                ...store_employees.filter(elt => elt["street"].toLowerCase().includes(valSearch)),
                ...store_employees.filter(elt => elt["city"].toLowerCase().includes(valSearch)),
                ...store_employees.filter(elt => elt["state"].toLowerCase().includes(valSearch))
            )
        }

        setTmpEmployees(tmpArray)
    }


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
                    <div className="row">
                        <div className="col-4 mt-3 mb-3 d-flex">
                            <span className="pe-2 my-auto">Show</span>
                            <Select options={numberOfItems} className="sel-numberItems" defaultValue={numberOfItems[0]} onChange={handleNumberItemChanged} />
                            <span className="ps-2 my-auto">entries</span>
                        </div>
                        <div className="col-8 mt-3 mb-3 d-flex justify-content-end">
                            <span className="pe-2 my-auto">Search :</span>
                            <input type="search" className="my-auto inputSearch" onChange={handleSearchInputChanged} />
                        </div>
                    </div>                        
                    <EmployeesTable employees={employees} />
                    <div className="row table-footer">
                        <div className="col-6 mt-1 d-flex">
                            { (valSearch.length < 3) ? (
                                <span className="pe-2 my-auto">Showing {defaultNumberItems} of {lenStoreEmployees} entries </span>
                            ) : (
                                <span className="pe-2 my-auto">Showing {lenEmployeesFiltered} of {lenTmpEmployees}  (filtered from {lenStoreEmployees} total entries)</span>
                            )}                            
                        </div>
                        <div className="col-6 mt-3 mb-3 d-flex justify-content-end">
                            <span><i className="fas fa-caret-left"></i></span>
                            Test
                            <span><i className="fas fa-caret-right"></i></span>
                        </div>
                    </div>          
                </div>
            </div>
        </div>
    )
}

export default EmployeesList