import React from 'react'
import './css/main.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { localHRKey, ROUTE_DASHBOARD, ROUTE_EMPLOYEE, ROUTE_EMPLOYEES, ROUTE_HOME, ROUTE_NEW_EMPLOYEE } from './utils/constants'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUser } from './store/slices/loginSlice'

import Header from './components/common/Header'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import NewEmployee from './pages/NewEmployee'
import Employees from './pages/Employees'
import EmployeeDetails from './components/EmployeeDetails'

function App() {  

  const localKey = localStorage.getItem(localHRKey)
  const dispatch = useDispatch()

  useEffect(() => {
    if(localKey != null) {
      dispatch(fetchUser(localKey))              
    }
  }, [localKey,dispatch])

  return (
      <Router>
         <div className="d-flex flex-column align-items-center w-100">
            <Header />
             <Routes>
                <Route exact path={ROUTE_HOME} element={<Home />}/>
                <Route exact path={ROUTE_DASHBOARD} element={<Dashboard />} />
                <Route exact path={ROUTE_NEW_EMPLOYEE} element={<NewEmployee />} />                 
                <Route exact path={ROUTE_EMPLOYEES} element={<Employees />} />
                <Route exact path={ROUTE_EMPLOYEE} element={<EmployeeDetails />} />
              </Routes>
          </div>           
      </Router>
  )
}


export default App