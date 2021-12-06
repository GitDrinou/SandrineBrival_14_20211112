import { dashboardItems } from '../utils/dashboardItems'
import { Link } from 'react-router-dom'
import '../sass/dashboard.scss'

/**
 * Component function : Dashboard
 * @returns a list of admin actions
 */
function Dashboard() {
    return (
        <div className="container mt-3 w-100 p-3">
            <div className="row">
                {
                    dashboardItems && dashboardItems.map((item, index) => (
                        <div  key={`item-${index}${item.id}`} className="col-lg-3 col-md-6 col-12 d-flex flex-lg-row flex-column justify-content-center align-items-center">
                            <Link to={item.route} className="card card-dashboard w-100">  
                                    <div className="card-body d-flex flex-column w-100 align-items-center justify-content-center dashb-body">
                                        <span className="card-title text-center">
                                            <i className={`${item.icon} dashb-icon`}></i>
                                            <p className="dashb-title">{item.title}</p>                                        
                                        </span>
                                        <span className="card-text w-100 dash-text">
                                            <p>{item.description}</p>
                                        </span>
                                    </div>
                            </Link>
                        </div>                        
                    ))
                }  
            </div>
        </div>
    )
}

                    
export default Dashboard