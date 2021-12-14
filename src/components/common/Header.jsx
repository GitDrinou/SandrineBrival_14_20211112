import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LogoIllustration from '../../assets/Logo_WealthHealth.webp'
import { localHRKey, localHRRemember, ROUTE_DASHBOARD, ROUTE_HOME } from '../../utils/constants'
import { logOut } from '../../store/slices/loginSlice'
import { useLocation } from 'react-router'
import '../../css/header.css'

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
             
            {
                (isSignOut && location.pathname !== ROUTE_HOME) ? (
                    <>
                        <Link to={ROUTE_DASHBOARD} className="logoContainerOn">
                            <div className="col-12 w-100 p-3 d-flex flex-row">
                                <img src={LogoIllustration} alt="Wealth Health Logo" />
                                <h1 className="my-auto text-center mx-3">HRnet</h1>                        
                            </div>
                        </Link>
                        <Link to={ROUTE_HOME} onClick={handleSignOut} className="link-signOut p-3" title="Sign Out">
                            <i className="fas fa-power-off header-signOut"></i>
                        </Link>
                    </>
                    
                ) : (
                    <div className="row logoContainerOff">
                        <div className="col-12 w-100 p-3 d-flex flex-row">
                            <img src={LogoIllustration} alt="Wealth Health Logo" />
                            <h1 className="my-auto text-center mx-3">HRnet</h1>                        
                        </div>
                    </div>
                )                
            }
            
        </header>  
    )
}

export default Header