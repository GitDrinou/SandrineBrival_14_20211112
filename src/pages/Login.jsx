import '../sass/login.scss'
import { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLogin } from '../store/slices/loginSlice'
import { localHRKey, localHRRemember, ROUTE_DASHBOARD } from '../utils/constants'
import { useNavigate } from 'react-router'

/**
 * Component function : Login
 * @returns login form for connection
 */
function Login() {

    // variable && constants
    let errorMessage
    const navigate = useNavigate()
    const dispatch = useDispatch() 
    
    // login selectors
    const loginStatus = useSelector(state => state.login.status)
    const loginError = useSelector(state => state.login.error)
    const userEmail = useSelector(state => state.login.userInfos.email)
    const userPassword = useSelector(state => state.login.userInfos.password)    
    
    // local state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberCheck, setRememberCheck] = useState(false)
     
    // on page load : Redirect to Dashboard page if credentials are authorized
    useEffect(() => { 
        if (localStorage.getItem(localHRRemember) !== null) {
            document.getElementById('emailUser').value = userEmail
            document.getElementById('passwordUser').value = userPassword
            document.getElementById('rememberMe').checked = true
        }                       
        if (loginStatus === "succeeded") {
            navigate(`${ROUTE_DASHBOARD}`)
        }
    }, [userEmail, userPassword, loginStatus,navigate])

    // condition if login failed > display an error
    if (loginStatus === 'failed') {
        errorMessage = <span className="error-message"> {loginError} </span>
    }

    // Events change inputs login
    const onEmailChanged = (e) => { setEmail(e.target.value) }
    const onPasswordChanged = (e) => { setPassword(e.target.value) }

    // Event change on Remember checkbox
    const onRememberChanged = (e) => {
        let valCheck = e.target.checked
        if (valCheck === true) {  
            setRememberCheck(true)
            localStorage.setItem(localHRRemember, true)         
        } else {       
            localStorage.removeItem(localHRKey)
            localStorage.removeItem(localHRRemember)
        }
    }

    // Event on submit button
    const onSubmitClicked = () => {
        let valEmail, valPassword
        valEmail = (email === '') ? userEmail : email
        valPassword = (password === '') ? userPassword : password

        dispatch(fetchLogin({ email: valEmail, password: valPassword }))

        if(localStorage.getItem(localHRRemember) === null) {
            setEmail('')
            setPassword('')
        } 
    }    
    

    return (
        <div className="card-body bg-secondary loginForm">
            <i className="fas fa-user-shield sign-in-icon card-body"></i>
             <span className="loginTitle">Sign In</span>            
            <p>Please enter your admin credentials : </p>
            <form>
                {errorMessage}
                <div className="form-group mb-2">
                    <label htmlFor="emailUser">E-mail</label>
                    <input type="email" id="emailUser" className="form-control" value={!userEmail ? email : userEmail} onChange={onEmailChanged} placeholder="Enter your email" required />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="passwordUser">Password</label>
                    <input type="password" id="passwordUser" className="form-control" value={!userPassword ? password : userPassword} onChange={onPasswordChanged}placeholder="Enter your password" required />
                </div>
                <div className="form-check  mt-4">
                    <input type="checkbox" className="form-check-input" id="rememberMe" checked={rememberCheck ? true : false} onChange={onRememberChanged} />
                    <label className="form-check-label" htmlFor="rememberMe">Remember credentials</label>
                </div>
                <button type="button" className="btn btn-dark mt-4 btnSignIn" onClick={onSubmitClicked}>Submit</button>
            </form>
        </div>
    )
}

export default Login