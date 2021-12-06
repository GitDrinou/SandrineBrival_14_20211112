import ReactDatePicker from 'react-datepicker'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDepartments, fetchStates, createEmployee, updateEmployee } from '../../store/slices/employeeSlice'
import Select from 'react-select'
import { formatDataForSelect, modaleEvents, formatDate } from '../../utils/functions'
import { ROUTE_DASHBOARD } from '../../utils/constants'
import Modale from '../Modale'
import "react-datepicker/dist/react-datepicker.css"
import '../../sass/form.scss'

/**
 * Component function : Employee Form
 * @param {object} props contain employee datas when user request an update
 * @returns a form to create, view or update an employee
 */
function EmployeeForm(props) {
    
    const dispatch = useDispatch()
    
    // local states
    const [employeeId, setEmployeeId] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [selectedState, setState] = useState('')
    const [startDate, setStartDate] = useState('')
    const [selectedDepartment, setDepartment] = useState('')
    const [error, setError] = useState('')
    const [isViewMode, setIsViewMode] = useState(false)
    const [isUpdateMode, setIsUpdateMode] = useState(false)    

    // employee selectors
    const errorStatus = useSelector(state => state.employee.error)
    const states = useSelector(state => state.employee.statesList)
    const departments = useSelector(state => state.employee.departmentsList)
    const creationStatus = useSelector(state => state.employee.creationStatus)
    const updateStatus = useSelector(state => state.employee.updateStatus)

    // Element which call the modal events function
    const btnOpenModale = document.querySelector('[aria-haspopup="dialog"]')
    
    // on page load
    useEffect(() => {  
        
        // dispatch to get all states and departments for filling each select components
        dispatch(fetchStates())
        dispatch(fetchDepartments())

        // condition on create or update store status to call the modal events function
        if ((creationStatus === "succeeded") || (updateStatus === "succeeded")) {        
            modaleEvents(isUpdateMode, btnOpenModale, ROUTE_DASHBOARD)
        } else { setError(errorStatus) }

        // condition if we are in a view or update mode
        if (props.data) { 
            setEmployeeId(props.data.id)
            if (!isUpdateMode) {setIsViewMode(true)}
        }   

    },[dispatch, creationStatus, updateStatus, btnOpenModale, errorStatus, props.data, isUpdateMode])
    
    // formatting datas for Select component
    const newStates = formatDataForSelect(states)
    const newDepartments = formatDataForSelect(departments) 

    // Change input events constant functions
    const onFirstNameChanged = (e) => setFirstName(e.target.value)
    const onLastNameChanged = (e) => setLastName(e.target.value)
    const onBirthDateChanged = (date) => setBirthDate(date)
    const onStreetChanged = (e) => setStreet(e.target.value)
    const onCityChanged = (e) => setCity(e.target.value)
    const onZipCodeChanged = (e) => setZipCode(e.target.value)
    const onAdrStateChanged = (e) => setState(e.value)
    const onStartDateChanged = (date) => setStartDate(date)
    const onDepartmentChanged = (e) => { setDepartment(e.value) }

    // constant to verify if required inputs are filling
    const canSave =  [firstName, lastName, birthDate, startDate, selectedDepartment].every(Boolean)

    // Event on Save button
    const handleSubmitForm = (e) => {
        e.preventDefault()
        // condition on update mode > dispatch a specific action
        if (isUpdateMode) {
            let vLastName = lastName !== '' ? lastName : props.data.lastName
            let vStreet = street !== '' ? street : props.data.street
            let vCity = city !== '' ? city : props.data.city
            let vZipCode = zipCode !== '' ? zipCode : props.data.zipCode
            let vSelState = selectedState !== '' ? selectedState : props.data.state
            let vSelDept = selectedDepartment !== '' ? selectedDepartment : props.data.department

            dispatch(updateEmployee({employeeId, vLastName, vStreet, vCity, vZipCode, vSelState, vSelDept}))
        } else {  
            if (canSave) {            
                dispatch(createEmployee({firstName, lastName, birthDate, street, city, zipCode, selectedState, startDate, selectedDepartment}))
            }   
            else {
                setError("Complete all the required fields (First Name, Last Name, Date of birth, Start Date and Department")
            }         
        }        
    } 
    
    // Event on Update button
    const handleGoUpdateForm = () => {
        setIsViewMode(false)
        setIsUpdateMode(true)
    }


    return (
        <div className="form-wrapper js-page">            
            <Modale />
            {error ? <div className="col-12 mb-2 errorMsg">{error}</div> : null }
            <form id="frmEmployee" className="js-document">
                <div className="row">
                    <div className="col-lg-6 col-12">
                        <div className="row mb-2">
                            { isViewMode ? ( 
                                <div className="col d-flex">
                                    <span className="details-label w-100">First Name</span>
                                    <span className="ms-3 ps-2 bg-white w-100 details-value">{props.data.firstName}</span>
                                </div>
                            ) : ( 
                                <div className="col">
                                    <label htmlFor="firstname" className="form-label">First Name</label>
                                    <input type="text" id="firstname" defaultValue={isUpdateMode ? props.data.firstName : firstName} readOnly={isUpdateMode ? true : false} className="form-control" onChange={onFirstNameChanged}aria-label="First name"/>
                                </div>
                            )}
                        </div>
                        <div className="row mb-2">
                            { isViewMode ? ( 
                                <div className="col d-flex">
                                    <span className="details-label w-100">Last Name</span>
                                    <span className="ms-3 ps-2 bg-white w-100 details-value">{props.data.lastName}</span>
                                </div>
                            ) : (                     
                                <div className="col">
                                    <label htmlFor="lastname" className="form-label">Last Name</label>
                                    <input type="text" id="lastname" defaultValue={isUpdateMode ? props.data.lastName : lastName} className="form-control" onChange={onLastNameChanged}  aria-label="Last name" />
                                </div>
                            )}
                        </div> 
                        <div className="row mb-2">
                            { isViewMode ? ( 
                                <div className="col d-flex">
                                    <span className="details-label w-100">Date of birth</span>
                                    <span className="ms-3 ps-2 bg-white w-100 details-value">{formatDate(props.data.birthDate)}</span>
                                </div>
                            ) : (                     
                                <div className="col-lg-6 col-12">
                                    <label htmlFor="birthdate" className="form-label">Date of birth</label>
                                    <ReactDatePicker selected={isUpdateMode ? Date.parse(props.data.birthDate) : birthDate} readOnly={isUpdateMode ? true : false} onChange={onBirthDateChanged} className="form-control" id="birthdate" />
                                </div>
                            )}
                        </div>
                    </div> 
                    <div className="col-lg-6 col-12">
                        <div className="row mb-2">
                            { isViewMode ? ( 
                                <div className="col d-flex">
                                    <span className="details-label w-100">Street</span>
                                    <span className="ms-3 ps-2 bg-white w-100 details-value">{props.data.street}</span>
                                </div>
                            ) : (
                                <div className="col">
                                    <label htmlFor="street" className="form-label">Street</label>
                                    <input type="text" id="street" defaultValue={isUpdateMode ? props.data.street : street} className="form-control" onChange={onStreetChanged}  aria-label="Adresse : street" />
                                </div>
                            )}
                        </div>
                        <div className="row mb-2">
                            { isViewMode ? ( 
                                <div className="col d-flex">
                                    <span className="details-label w-100">City</span>
                                    <span className="ms-3 ps-2 bg-white w-100 details-value">{props.data.city}</span>
                                </div>
                            ) : (
                            <div className="col-lg-6 col-12">
                                <label htmlFor="city" className="form-label">City</label>
                                <input type="text" id="city" defaultValue={isUpdateMode ? props.data.city : city} className="form-control" onChange={onCityChanged}  aria-label="Adresse : city" />
                            </div>
                            )}
                            { isViewMode ? ( 
                                <div className="col d-flex">
                                    <span className="details-label w-100">Zip Code</span>
                                    <span className="ms-3 ps-2 bg-white w-100 details-value">{props.data.zipCode}</span>
                                </div>
                            ) : (
                                <div className="col">
                                    <label htmlFor="zipcode" className="form-label">Zip Code</label>
                                    <input type="number" id="zipcode" defaultValue={isUpdateMode ? props.data.zipCode : zipCode} className="form-control" onChange={onZipCodeChanged}  aria-label="Adresse : zip code" min="0" />
                                </div>
                            )}
                        </div> 
                        <div className="row mb-2">
                            { isViewMode ? ( 
                                <div className="col d-flex">
                                    <span className="details-label w-100">State</span>
                                    <span className="ms-3 ps-2 bg-white w-100 details-value">{props.data.state}</span>
                                </div>
                            ) : (
                                <div className="col-lg-6 col-12">
                                    <label htmlFor="state" className="form-label">State</label>
                                    <Select options={newStates} onChange={onAdrStateChanged} value={ isUpdateMode ? newStates.filter(option => option.value === props.data.state) : null } />
                                </div>
                            )}                    
                        </div>                       
                    </div>
                </div> 
                <div className="row mb-3 p-3 job-datas">
                    { isViewMode ? ( 
                        <div className="col-lg-6 col-12 d-flex">
                            <span className="details-label w-100">Start Date</span>
                            <span className="ms-3 ps-2 bg-white w-100 details-value">{formatDate(props.data.startDate)}</span>
                        </div>
                    ) : ( 
                        <div className="col-lg-6 col-12 mb-2">
                            <label htmlFor="startdate" className="form-label">Start Date</label>
                            <ReactDatePicker selected={isUpdateMode ? Date.parse(props.data.startDate) : startDate} readOnly={isUpdateMode ? true : false}  onChange={onStartDateChanged} className="form-control" id="startdate" />
                        </div>
                    )}
                    { isViewMode ? ( 
                        <div className="col-lg-6 col-12 d-flex">
                            <span className="details-label w-100">Department</span>
                            <span className="ms-3 ps-2 bg-white w-100 details-value">{props.data.department}</span>
                        </div>
                    ) : ( 
                        <div className="col-lg-6 col-12">
                            <label htmlFor="department" className="form-label">Department</label>
                            <Select options={newDepartments} onChange={onDepartmentChanged} defaultValue={ isUpdateMode ? newDepartments.filter(option => option.value === props.data.department) : newDepartments }  />
                        </div>
                    )}
                </div>
                { isViewMode ? (                         
                    <div className="row mb-3 mt-3">
                        <button type="button" className="btn btn-secondary p-3" onClick={handleGoUpdateForm}>Update it</button>
                    </div>
                ) : ( 
                    <div className="row mb-3 mt-3">
                        <button type="button" className="btn btn-secondary p-3" onClick={handleSubmitForm} aria-haspopup="dialog" aria-controls="dialog">Save { isUpdateMode ? `changes`: null}</button>
                    </div>
                 )}
            </form>
        </div>
        
    )
}

export default EmployeeForm