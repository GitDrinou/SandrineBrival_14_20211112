// ROUTES
export const ROUTE_HOME = "/"
export const ROUTE_DASHBOARD = "/dashboard"
export const ROUTE_NEW_EMPLOYEE = "/new_employee"
export const ROUTE_EMPLOYEES = "/employees"
export const ROUTE_EMPLOYEE = "/employee/:id"


// localStorage
export const localHRKey = 'HRNetKey'
export const localHRRemember = 'HRRememberChecked'

// Modal
export const MODAL_TITLE_CREATION = "Employee created"
export const MODAL_DESC_CREATION = "A new employee have been successfully created on your database."
export const MODAL_TITLE_UPDATE = "Employee updated"
export const MODAL_DESC_UPDATE = "Employee have been successfully updated on your database."

// API URLs
export const LOGIN_API = 'http://localhost:3001/api/v1/user/login'
export const USER_API = 'http://localhost:3001/api/v1/user/details'
export const STATES_API = 'http://localhost:3001/api/v1/state/list'
export const DEPT_API = 'http://localhost:3001/api/v1/department/list'
export const NEW_EMPLOYEE_API = 'http://localhost:3001/api/v1/employee/new'
export const EMPLOYEES_API = 'http://localhost:3001/api/v1/employee/details'

// table pagination : number of items to display
export const numberOfItems = [ 
    { value: 5, label: "5" },
    { value: 10, label: "10" },
    { value: 20, label: "20" }
]