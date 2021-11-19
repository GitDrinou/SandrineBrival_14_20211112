import '../sass/form.scss'
import EmployeeForm from "../components/common/EmployeeForm"

function NewEmployee() {
    return (

        <div className="container mt-3 w-100 p-3">
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