import EmployeeForm from '../components/common/EmployeeForm'

/**
 * Component function : New employee
 * @returns the employee's creation form
 */
function NewEmployee() {

    return (
        <>
            <div className="container w-100 p-3">
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
        </>
        
    )
}

export default NewEmployee