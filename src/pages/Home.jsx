import '../css/home.css'
import HRIllustration from '../assets/human-resources-g2478e1e66_1280.webp'

import Login from './Login'

/**
 * Component function : Home
 * @returns the login form for user admin connection
 */
function Home() {

    return (
        <div className="container"> 
            <div className="row">  
                <div className="col-lg-8 col-12 mx-auto mt-3 p-2 w-lg-50 w-s-100 w-md-100 brand-block">
                    <p className='p-3 border'>Welcome to your HRNet <br />
                    Manage your employees easily !</p>                                      
                    <img src={HRIllustration} alt="HR illustration" className="brand-img" />
                </div>              
                <div className="col-lg-4 col-12 mx-lg-auto w-s-100 w-md-100 m-2 mt-lg-3 p-2 bg-secondary signIn-block">                                      
                    <div className="card bg-secondary">
                        <Login />
                    </div>
                </div>
                
            </div>
        </div>       
    )
}

export default Home