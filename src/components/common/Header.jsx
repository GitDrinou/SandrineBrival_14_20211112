import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import LogoIllustration from '../../assets/Logo_WealthHealth.svg'
import { localHRKey, ROUTE_HOME } from '../../utils/constants'
import '../../sass/header.scss'
import { logOut } from '../../store/slices/loginSlice'

function Header() {

    const dispatch = useDispatch()
    
    const localKey = sessionStorage.getItem(localHRKey)

    // function to dispatch logOut reducer
    const handleSignOut = () => {
        dispatch(logOut())
    }

    return (
        <header className="container mt-2 h-100">
            <div className="row logoContainer">
                <div className="col-12 w-100 p-3">
                    <img src={LogoIllustration} alt="Wealth Health Logo" />
                    <h1 className="my-auto text-center ">HRnet</h1>                        
                </div>
            </div> 
            {
                (localKey) ? (
                    <Link to={ROUTE_HOME} onClick={handleSignOut} className="link-signOut p-3">
                        <i className="fa fa-sign-out header-signOut"></i>
                        <span className="signOut-text">Sign Out</span>
                    </Link>
                ) : (null)                    
            }
            
        </header>  
    )
}

export default Header