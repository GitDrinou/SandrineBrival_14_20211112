import { useEffect } from "react"
import { } from "react-redux"
import { useDispatch, useSelector} from "react-redux"
import { useNavigate, useParams } from "react-router"
import { fetchEmployee } from "../store/slices/employeeSlice"
import EmployeeForm from "./common/EmployeeForm"

function EmployeeDetails() {

    const idEmployee = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchEmployee(idEmployee))
    }, [dispatch, idEmployee])

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