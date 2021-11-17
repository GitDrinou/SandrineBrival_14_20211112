import './sass/main.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ROUTE_DASHBOARD, ROUTE_HOME } from './utils/constants'
import Header from './components/common/Header'
// import Footer from './components/common/Footer'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'

function App() {  

  return (
      <Router>
         <div className="d-flex flex-column align-items-center w-100">
            <Header />
             <Routes>
                 <Route exact path={ROUTE_HOME} element={<Home />}/>
                 <Route exact path={ROUTE_DASHBOARD} element={<Dashboard />} />
             </Routes>
            {/* <Footer /> */}
          </div> 
          
      </Router>
  )
}


export default App