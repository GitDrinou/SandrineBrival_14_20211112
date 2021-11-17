import '../sass/login.scss'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLogin } from '../store/slices/loginSlice'
import { ROUTE_DASHBOARD } from '../utils/constants'
import { useNavigate } from 'react-router'

function Login() {

    //let errorMessage
    
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //const [remember, setRemember] = useState(false)

    const dispatch = useDispatch()

    const onEmailChanged = (e) => { setEmail(e.target.value) }
    const onPasswordChanged = (e) => { setPassword(e.target.value) }

    const canSave = [email, password].every(Boolean)

    // const onRememberChanged = (e) => {
    //     let valCheck = e.target.checked
    //     if (valCheck === true) { 
    //         setRemember(true) 
    //     } else {
    //         setRemember(false)
    //     }
    // }

    // Event on submit
    const onSubmitClicked = () => {
        if (canSave) {
            dispatch(fetchLogin({ email, password }))
            // if (!remember) {
            //     setEmail('')
            //     setPassword('')
            // }
        }
    }

    const loginStatus = useSelector(state => state.login.status)
    
    useEffect(() => {
        if (loginStatus === "succeeded") {
            navigate(`${ROUTE_DASHBOARD}`)
        }
    }, [loginStatus,navigate])


    return (
        <div className="card-body bg-secondary loginForm">
            <i className="fas fa-user-shield sign-in-icon card-body"></i>
             <span className="loginTitle">Sign In</span>            
            <p>Please enter your admin credentials : </p>
            <form>
                <div className="form-group mb-2">
                    <label htmlFor="emailUser">E-mail</label>
                    <input type="email" id="emailUser" className="form-control" value={email} onChange={onEmailChanged} placeholder="Enter your email" required />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="passwordUser">Password</label>
                    <input type="password" id="passwordUser" className="form-control" value={password} onChange={onPasswordChanged} placeholder="Enter your password" required />
                </div>
                {/* <div className="form-check  mt-4">
                    <input type="checkbox" className="form-check-input" id="rememberMe" checked={remember ? true : false} onChange={onRememberChanged} />
                    <label className="form-check-label" htmlFor="rememberMe">Remember credentials</label>
                </div> */}
                <button type="button" className="btn btn-dark mt-4 btnSignIn" onClick={onSubmitClicked}>Submit</button>
            </form>
        </div>
    )
}

export default Login