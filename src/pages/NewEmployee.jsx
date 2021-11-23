import '../sass/form.scss'
import EmployeeForm from "../components/common/EmployeeForm"
import { useNavigate } from 'react-router'

function NewEmployee() {

    const navigate = useNavigate()

    return (

        <div className="container w-100 p-3">
            <div className="row mb-2 w-100">
                <div className="col d-flex align-items-center">
                    <i className="fas fa-angle-left icoBack" title="Go to dashboard" onClick={() => navigate(-1)}></i>
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