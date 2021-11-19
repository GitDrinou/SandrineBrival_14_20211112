import ReactDatePicker from 'react-datepicker'
import { useState } from 'react'
import defaultProfil from '../../assets/default-profil.png'
import "react-datepicker/dist/react-datepicker.css"
import '../../sass/form.scss'

function EmployeeForm() {

    const [startDate, setStartDate] = useState('');
    //const [birthDate, setBirthDate] = useState(new Date())

    return (
        <div className="form-wrapper">
            <form>
                <div className="row">
                    <div className="col-6">
                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="firstname" className="form-label">First Name</label>
                                <input type="text" id="firstname" className="form-control" aria-label="First name" />
                            </div>
                        </div>
                        <div className="row mb-3">                    
                            <div className="col">
                                <label htmlFor="lastname" className="form-label">Last Name</label>
                                <input type="text" id="lastname" className="form-control" aria-label="Last name" />
                            </div>
                        </div> 
                        <div className="row mb-3">                    
                            <div className="col-6">
                                <label htmlFor="birthdate" className="form-label">Date of birth</label>
                                <ReactDatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="form-control" />
                            </div>
                        </div>
                    </div> 
                    <div className="col-6">
                        <div className="row mb-3">
                            <div className="col-6">
                                <label for="picturefile" class="form-label">Picture</label>                        
                                <input class="form-control" type="file" id="formFile" />
                                <img src={defaultProfil} alt="ID pic" className="employee-pic" />
                            </div>
                        </div>                        
                    </div>
                </div>
                
                               
                
                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="street" className="form-label">Street</label>
                        <input type="text" id="street" className="form-control" aria-label="Adresse : street" />
                    </div>
                    <div className="col">
                        <label htmlFor="city" className="form-label">City</label>
                        <input type="text" id="city" className="form-control" aria-label="Adresse : city" />
                    </div>
                </div>                
                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="state" className="form-label">state</label>
                        {/* state Component */}
                        <span><br />** State component **</span>
                    </div>
                    <div className="col">
                        <label htmlFor="zipcode" className="form-label">Zip Code</label>
                        <input type="number" id="zipcode" className="form-control" aria-label="Adresse : zip code" min="0" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="startdate" className="form-label">Start Date</label>
                        {/* Start Date Component */}
                        <span><br />** Start Date component **</span>
                    </div>
                    <div className="col">
                        <label htmlFor="department" className="form-label">Department</label>
                        {/* Department Component */}
                        <span><br />** Department component **</span>
                    </div>
                </div>
                <div className="row mb-3 mt-5">
                    <button type="button" className="btn btn-dark">Save</button>
                </div>
            </form>
        </div>
        
    )
}

export default EmployeeForm