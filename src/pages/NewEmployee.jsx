import React from 'react'
import { useNavigate } from 'react-router'
import '../sass/form.scss'

import EmployeeForm from '../components/common/EmployeeForm'

/**
 * Component function : New employee
 * @returns the employee's creation form
 */
function NewEmployee() {

    // constant
    const navigate = useNavigate()

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
                        <h1>Create employee</h1>                            
                    </div>                        
                    <EmployeeForm />         
                </div>
            </div>
        </div>
    )
}

export default NewEmployee