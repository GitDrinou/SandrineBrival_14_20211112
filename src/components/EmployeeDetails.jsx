import React, { useEffect } from 'react'
import { useDispatch, useSelector} from "react-redux"
import { useNavigate, useParams } from "react-router"
import { fetchEmployee } from "../store/slices/employeeSlice"

import EmployeeForm from './common/EmployeeForm'

/**
 * Component function : Employee Details
 * @returns the employee detals using the employee form component
 */
function EmployeeDetails() {

    // constants
    const idEmployee = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // on page load
    useEffect(() => {
        dispatch(fetchEmployee(idEmployee))
    }, [dispatch, idEmployee])

    // selector
    const employee = useSelector(state => state.employee.employee_details)
        
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
                    <div className="newemployee--header">
                        <i className="fas fa-edit my-auto"></i>
                        <h1>Employee details</h1>                            
                    </div>                        
                    <EmployeeForm data={employee}/>         
                </div>
            </div>
        </div>
    )
}

export default EmployeeDetails