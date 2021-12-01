import { formatDate, sortedDatas } from '../../utils/functions'
import '../../sass/employees.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router'

function EmployeesTable(props) {
    
    const employees = [...props.employees]
    const [oldSortedBy, setOldSprtedBy] = useState('')
    const [sortedBy, setSortedBy] = useState('lastName')

    const navigate = useNavigate()

    let defaultSorted = sortedDatas(employees, oldSortedBy, sortedBy) 
    
    const handleSortTable = (e) => { 
        e.preventDefault()
        let eltClicked = e.target.id
        console.log(eltClicked)
        sortedBy === oldSortedBy ? setOldSprtedBy('') : setOldSprtedBy(sortedBy)
        setSortedBy(eltClicked.split('_')[1])
    }

    const handleClickViewDetails = (e) => {
        e.preventDefault()
        navigate(`/employee/${e.target.id}`)
    }

    //console.log(defaultSorted)

    return (
        <div className="table-responsive">
            <table className="table table-hover tbl">
                <thead>
                    <tr>
                        <th scope="col">
                            <div className="d-flex justify-content-between tbl-header" id="div_lastName" onClick={handleSortTable}>
                                <span>Last Name</span>
                                <span className="float-right"><i className="fas fa-sort"></i></span>
                            </div>                        
                        </th>
                        <th scope="col">
                            <div className="d-flex justify-content-between tbl-header" id="div_firstName" onClick={handleSortTable}>
                                <span>First Name</span>
                                <span className="float-right"><i className="fas fa-sort"></i></span>
                            </div>
                        </th>
                        <th scope="col">
                            <div className="d-flex justify-content-between tbl-header" id="div_startDate" onClick={handleSortTable}>
                                <span>Start Date</span>
                                <span className="float-right"><i className="fas fa-sort"></i></span>
                            </div>
                        </th>
                        <th scope="col">
                            <div className="d-flex justify-content-between tbl-header" id="div_department" onClick={handleSortTable}>
                                <span>Department</span>
                                <span className="float-right"><i className="fas fa-sort"></i></span>
                            </div>
                        </th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { defaultSorted && defaultSorted.map((emp, index) => (
                        <tr key={`empl-${index}`}>
                            <td>{emp.lastName}</td>
                            <td>{emp.firstName}</td>
                            <td>{formatDate(emp.startDate)}</td>
                            <td>{emp.department}</td>                        
                            <td><i className="fas fa-eye" title="View more..." id={emp._id} onClick={handleClickViewDetails}></i></td>
                        </tr>
                    ))}                
                </tbody>
            </table>
        </div>
    )
}

export default EmployeesTable