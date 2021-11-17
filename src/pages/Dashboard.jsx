import '../sass/dashboard.scss'

function Dashboard() {
    return (
        <div className="container w-100">
            <div className="row mt-3">                
                <div className="col-lg-4 col-12 d-flex flex-lg-row flex-column">
                    <div className="card card-dashboard w-100 p-5">
                        <div className="card-body d-flex flex-column  w-100 align-items-center dashb-body">
                            <span className="card-text text-center">
                                <i className="fas fa-address-book dashb-icon"></i>
                                <p className="dashb-text">List of employees</p>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-12 d-flex flex-lg-row flex-column">
                    <div className="card card-dashboard w-100 p-5">
                        <div className="card-body d-flex flex-column w-100 align-items-center dashb-body">
                            <span className="card-text text-center">
                                <i className="fas fa-user-plus dashb-icon"></i>
                                <p className="dashb-text">Add a new employee</p>
                            </span>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
    )
}

                    
export default Dashboard