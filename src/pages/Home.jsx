import '../sass/home.scss'
import HRIllustration from '../assets/human-resources-g2478e1e66_1280.png'
import Login from './Login'

function Home() {

    return (
        <div className="container home-container"> 
            <div className="row">                
                <div className="col-lg-4 col-md-6 col-12 mx-auto mt-3 p-2 bg-secondary">                                      
                    <div className="card  bg-secondary">
                        <Login />
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12 text-center mx-auto mt-3 mb-5">                                      
                    <img src={HRIllustration} alt="HR illustration" className="brand-img" />
                </div>
            </div>
        </div>       
    )
}

export default Home