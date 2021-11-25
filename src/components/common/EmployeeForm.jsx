import ReactDatePicker from 'react-datepicker'
import { useState } from 'react'
import "react-datepicker/dist/react-datepicker.css"
import '../../sass/form.scss'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDepartments, fetchStates, createEmployee } from '../../store/slices/employeeSlice'
import Select from 'react-select'
import { formatDataForSelect } from '../../utils/functions'

function EmployeeForm() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [zipCode, setZipCode] = useState('')
        const [selectedState, setSelectedState] = useState('')
    const [startDate, setStartDate] = useState('')
    const [selectedDepartment, setSelectedDepartment] = useState('')

    const dispatch = useDispatch()

    const states = useSelector(state => state.employee.statesList)
    const departments = useSelector(state => state.employee.departmentsList)

    const creationStatus = useSelector(state => state.employee.creationStatus)

    useEffect(() => {
        dispatch(fetchStates())
        dispatch(fetchDepartments())
    },[dispatch])
    
    const newStates = formatDataForSelect(states)

    const newDepartments = formatDataForSelect(departments) 

    // Change events
    const onFirstNameChanged = (e) => setFirstName(e.target.value)
    const onLastNameChanged = (e) => setLastName(e.target.value)
    const onBirthDateChanged = (date) => setBirthDate(date)
    const onStreetChanged = (e) => setStreet(e.target.value)
    const onCityChanged = (e) => setCity(e.target.value)
    const onZipCodeChanged = (e) => setZipCode(e.target.value)
    const onAdrStateChanged = (e) => setSelectedState(e.value)
    const onStartDateChanged = (date) => setStartDate(date)
    const onDepartmentChanged = (e) => setSelectedDepartment(e.value)   
    
    const canSave =  [firstName, lastName, birthDate, startDate, selectedDepartment].every(Boolean)

    const handleSubmitForm = (e) => {
        e.preventDefault()       
        if (canSave) {
            dispatch(createEmployee({firstName, lastName, birthDate, street, city, zipCode, selectedState, startDate, selectedDepartment}))
        }
    }


    return (
        <div className="form-wrapper">
            <form id="frmEmployee">
                <div className="row">
                    <div className="col-lg-6 col-12">
                        <div className="row mb-2">
                            <div className="col">
                                <label htmlFor="firstname" className="form-label">First Name</label>
                                <input type="text" id="firstname" className="form-control" onChange={onFirstNameChanged} aria-label="First name"/>
                            </div>
                        </div>
                        <div className="row mb-2">                    
                            <div className="col">
                                <label htmlFor="lastname" className="form-label">Last Name</label>
                                <input type="text" id="lastname" className="form-control" onChange={onLastNameChanged}  aria-label="Last name" />
                            </div>
                        </div> 
                        <div className="row mb-2">                    
                            <div className="col-lg-6 col-12">
                                <label htmlFor="birthdate" className="form-label">Date of birth</label>
                                <ReactDatePicker selected={birthDate} onChange={onBirthDateChanged} className="form-control" id="birthdate" />
                            </div>
                        </div>
                    </div> 
                    <div className="col-lg-6 col-12">
                        <div className="row mb-2">
                            <div className="col">
                                <label htmlFor="street" className="form-label">Street</label>
                                <input type="text" id="street" className="form-control" onChange={onStreetChanged}  aria-label="Adresse : street" />
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-lg-6 col-12">
                                <label htmlFor="city" className="form-label">City</label>
                                <input type="text" id="city" className="form-control" onChange={onCityChanged}  aria-label="Adresse : city" />
                            </div>
                            <div className="col">
                                <label htmlFor="zipcode" className="form-label">Zip Code</label>
                                <input type="number" id="zipcode" className="form-control" onChange={onZipCodeChanged}  aria-label="Adresse : zip code" min="0" />
                            </div>
                        </div> 
                        <div className="row mb-2">
                            <div className="col-lg-6 col-12">
                                <label htmlFor="state" className="form-label">state</label>
                                <Select options={newStates} onChange={onAdrStateChanged} />
                            </div>                    
                        </div>                       
                    </div>
                </div> 
                <div className="row mb-3 p-3 job-datas">
                    <div className="col-lg-6 col-12 mb-2">
                        <label htmlFor="startdate" className="form-label">Start Date</label>
                        <ReactDatePicker selected={startDate} onChange={onStartDateChanged} className="form-control" id="startdate" />
                    </div>
                    <div className="col-lg-6 col-12">
                        <label htmlFor="department" className="form-label">Department</label>
                        <Select options={newDepartments} onChange={onDepartmentChanged} />
                    </div>
                </div>
                <div className="row mb-3 mt-3">
                    <button type="button" className="btn btn-secondary p-3" onClick={handleSubmitForm}>Save</button>
                </div>
            </form>
        </div>
        
    )
}

export default EmployeeForm