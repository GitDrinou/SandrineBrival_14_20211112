import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import LogoIllustration from '../../assets/Logo_WealthHealth.svg'
import { localHRKey, localHRRemember, ROUTE_HOME } from '../../utils/constants'
import '../../sass/header.scss'
import { logOut } from '../../store/slices/loginSlice'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

/**
 * Component function : Header
 * @returns the header of the site
 */
function Header() {
    
    // constants
    const dispatch = useDispatch()
    const location = useLocation()

    // local state
    const [token, setToken] = useState('')

    // selector
    const stateToken = useSelector(state => state.login.token)    

    // initialized secure key
    const isSignOut = stateToken === null ? token : stateToken

    // on page load
    useEffect(() => {
        if (!isSignOut && location.pathname !== ROUTE_HOME) {
            setToken(localStorage.getItem(localHRKey))
        }
    }, [isSignOut, location.pathname])

    // function to dispatch logOut reducer
    const handleSignOut = () => {        
        dispatch(logOut({isRemember: JSON.parse(localStorage.getItem(localHRRemember))}))
    }

    return (
        <header className="container h-100">
            <div className="row logoContainer">
                <div className="col-12 w-100 p-3 d-flex flex-row">
                    <img src={LogoIllustration} alt="Wealth Health Logo" />
                    <h1 className="my-auto text-center mx-3">HRnet</h1>                        
                </div>
            </div> 
            {
                (isSignOut) ? (
                    <Link to={ROUTE_HOME} onClick={handleSignOut} className="link-signOut p-3" title="Sign Out">
                        <i className="fas fa-power-off header-signOut"></i>
                        {/* <span className="signOut-text">Sign Out</span> */}
                    </Link>
                ) : null                
            }
            
        </header>  
    )
}

export default Header