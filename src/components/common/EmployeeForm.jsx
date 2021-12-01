import ReactDatePicker from 'react-datepicker'
import { useState } from 'react'
import "react-datepicker/dist/react-datepicker.css"
import '../../sass/form.scss'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDepartments, fetchStates, createEmployee } from '../../store/slices/employeeSlice'
import Select from 'react-select'
import { formatDataForSelect, modaleEvents, formatDate } from '../../utils/functions'
import { ROUTE_DASHBOARD } from '../../utils/constants'
import Modale from '../Modale'

function EmployeeForm(props) {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [selectedState, setState] = useState('')
    const [startDate, setStartDate] = useState('')
    const [selectedDepartment, setDepartment] = useState('')
    const [isViewMode, setIsViewMode] = useState(false)
    
    const dispatch = useDispatch()

    const states = useSelector(state => state.employee.statesList)
    const departments = useSelector(state => state.employee.departmentsList)

    const creationStatus = useSelector(state => state.employee.creationStatus)
    const btnOpenModale = document.querySelector('[aria-haspopup="dialog"]')
    
    useEffect(() => {        
        dispatch(fetchStates())
        dispatch(fetchDepartments())
        if(creationStatus === "succeeded") {        
            modaleEvents(btnOpenModale, ROUTE_DASHBOARD)
        }
        if (props.data) { setIsViewMode(true) }       
    },[dispatch, creationStatus, btnOpenModale, props.data])
    
    const newStates = formatDataForSelect(states)
    const newDepartments = formatDataForSelect(departments) 

    // Change events
    const onFirstNameChanged = (e) => setFirstName(e.target.value)
    const onLastNameChanged = (e) => setLastName(e.target.value)
    const onBirthDateChanged = (date) => setBirthDate(date)
    const onStreetChanged = (e) => setStreet(e.target.value)
    const onCityChanged = (e) => setCity(e.target.value)
    const onZipCodeChanged = (e) => setZipCode(e.target.value)
    const onAdrStateChanged = (e) => setState(e.value)
    const onStartDateChanged = (date) => setStartDate(date)
    const onDepartmentChanged = (e) => setDepartment(e.value) 

    const canSave =  [firstName, lastName, birthDate, startDate, selectedDepartment].every(Boolean)

    const handleSubmitForm = (e) => {
        e.preventDefault()       
        if (canSave) {
            dispatch(createEmployee({firstName, lastName, birthDate, street, city, zipCode, selectedState, startDate, selectedDepartment}))
        }        
    } 
    
    return (
        <div className="form-wrapper js-page">            
            <Modale />
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
                                    <input type="text" id="firstname" defaultValue={firstName} className="form-control" onChange={onFirstNameChanged}aria-label="First name"/>
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
                                    <input type="text" id="lastname" defaultValue={lastName} className="form-control" onChange={onLastNameChanged}  aria-label="Last name" />
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
                                    <ReactDatePicker selected={birthDate} onChange={onBirthDateChanged} className="form-control" id="birthdate" />
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
                                    <input type="text" id="street" defaultValue={street} className="form-control" onChange={onStreetChanged}  aria-label="Adresse : street" />
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
                                <input type="text" id="city" defaultValue={city} className="form-control" onChange={onCityChanged}  aria-label="Adresse : city" />
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
                                    <input type="number" id="zipcode" defaultValue={zipCode} className="form-control" onChange={onZipCodeChanged}  aria-label="Adresse : zip code" min="0" />
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
                                    <Select options={newStates} onChange={onAdrStateChanged} />
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
                            <ReactDatePicker selected={startDate} onChange={onStartDateChanged} className="form-control" id="startdate" />
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
                            <Select options={newDepartments} onChange={onDepartmentChanged} />
                        </div>
                    )}
                </div>
                { isViewMode ? (                         
                    <div className="row mb-3 mt-3">
                        <button type="button" className="btn btn-info p-3" onClick={handleSubmitForm} aria-haspopup="dialog" aria-controls="dialog">Update</button>
                    </div>
                ) : ( 
                    <div className="row mb-3 mt-3">
                        <button type="button" className="btn btn-secondary p-3" onClick={handleSubmitForm} aria-haspopup="dialog" aria-controls="dialog">Save</button>
                    </div>
                 )}
            </form>
        </div>
        
    )
}

export default EmployeeForm