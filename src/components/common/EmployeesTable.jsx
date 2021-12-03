import { formatDate, sortedDatas } from '../../utils/functions'
import '../../sass/employees.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import Select from 'react-select'
import { numberOfItems } from '../../utils/constants'

function EmployeesTable(props) {
    
    const employees = [...props.employees]

    let employeesDisplayed = []
    let numberPages = []

    const [oldSortedBy, setOldSprtedBy] = useState('')
    const [sortedBy, setSortedBy] = useState('lastName')

    const navigate = useNavigate()

    let defaultSorted = sortedDatas(employees, oldSortedBy, sortedBy) 
    
    const [firstItem, setFirstItem] = useState(0)
    const [valSearch, setValSearch] = useState('')
    const [tmpEmployees, setTmpEmployees] = useState([])

    const [defaultNumberItems, setDefaultNumberItems] = useState(numberOfItems[0].value)
    
    const lenSortedEmployees = defaultSorted.length
    const lenTmpEmployees = tmpEmployees.length

    let lenEmployeesFiltered = parseInt(defaultNumberItems) > defaultNumberItems ? defaultNumberItems : lenTmpEmployees
    let totalPage = Math.ceil(lenSortedEmployees / parseInt(defaultNumberItems))

    for (let i=1; i <=totalPage; i++) { 
        numberPages.push(i) 
    }

    if (valSearch.length < 3) {
        for (let i in defaultSorted) {
            let index = defaultSorted.indexOf(defaultSorted[i])
            
            if ( index < firstItem + parseInt(defaultNumberItems) && index >= firstItem) {
                employeesDisplayed.push(defaultSorted[i])
            }           
        }        
    }
    else {
        for (let tmp in tmpEmployees) {
            for (let emp in defaultSorted ) {
                if (tmpEmployees[tmp] === defaultSorted[emp]) {                    
                    employeesDisplayed.push(tmpEmployees[tmp])
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
                ...defaultSorted.filter(elt => elt["lastName"].toLowerCase().includes(valSearch)),
                ...defaultSorted.filter(elt => elt["firstName"].toLowerCase().includes(valSearch)),
                ...defaultSorted.filter(elt => elt["startDate"].includes(valSearch)),
                ...defaultSorted.filter(elt => elt["department"].toLowerCase().includes(valSearch)),
                ...defaultSorted.filter(elt => elt["birthDate"].includes(valSearch)),
                ...defaultSorted.filter(elt => elt["street"].toLowerCase().includes(valSearch)),
                ...defaultSorted.filter(elt => elt["city"].toLowerCase().includes(valSearch)),
                ...defaultSorted.filter(elt => elt["state"].toLowerCase().includes(valSearch))
            )
        }

        setTmpEmployees(tmpArray)
    }
    
    const handleSortTable = (e) => { 
        e.preventDefault()
        let eltClicked = e.target.id
        sortedBy === oldSortedBy ? setOldSprtedBy('') : setOldSprtedBy(sortedBy)
        setSortedBy(eltClicked.split('_')[1])
    }

    const handleClickViewDetails = (e) => {
        e.preventDefault()
        navigate(`/employee/${e.target.id}`)
    }

    const handlePreviousClicked = () => {
        if((firstItem - parseInt(defaultNumberItems)) <= lenSortedEmployees) {
            setFirstItem(firstItem - parseInt(defaultNumberItems))
        }
    }

    const handleNextClicked = () => {
        if((firstItem + parseInt(defaultNumberItems)) <= lenSortedEmployees) {
            setFirstItem(firstItem + parseInt(defaultNumberItems))
        }
    }

    const handleStartClicked = () => { setFirstItem(0) }    
    const handleEndClicked = () => { setFirstItem(numberPages * parseInt(defaultNumberItems) - parseInt(defaultNumberItems)) }

    const handlePageClicked = (e) => { setFirstItem(e.target.dataset.id * parseInt(defaultNumberItems) -  parseInt(defaultNumberItems) )} 
        

    return (
        <div>            
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
                        { employeesDisplayed && employeesDisplayed.map((emp, index) => (
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
            <div className="row table-footer">
                <div className="col-6 mt-1 d-flex">
                    { (valSearch.length < 3) ? (
                        <span className="pe-2 my-auto">Showing {defaultNumberItems} of {lenSortedEmployees} entries </span>
                    ) : (
                        <span className="pe-2 my-auto">Showing {lenEmployeesFiltered} of {lenTmpEmployees}  (filtered from {lenSortedEmployees} total entries)</span>
                    )}                            
                </div>
                <div className="col-6 mt-3 mb-3 d-flex justify-content-end">
                    <span className="my-auto" onClick={handleStartClicked}><i className="fas fa-step-backward"></i></span>
                    <span className="my-auto" onClick={handlePreviousClicked}><i className="fas fa-chevron-left"></i></span>
                    {
                        numberPages && numberPages.map((btn, index) => (
                            <button className="my-auto btnPage" key={index} data-id={btn} onClick={handlePageClicked}>{btn}</button>
                        ))
                    }
                    <span className="my-auto" onClick={handleNextClicked}><i className="fas fa-chevron-right"></i></span>
                    <span className="my-auto" onClick={handleEndClicked}><i className="fas fa-step-forward"></i></span>
                </div>
            </div>    
        </div>
        
    )
}

export default EmployeesTable