import { formatDate } from '../../utils/functions'

function EmployeesTable(props) {
    
    const employeesToOrder = [...props.employees]

    const employeesOrderByDefault = employeesToOrder.sort(function compare(a, b) {
        if (a.lastName < b.lastName)
           return -1;
        if (a.lastName > b.lastName )
           return 1;
        return 0;
      });

      console.log(employeesOrderByDefault)

    return (
        <div className="table-responsive">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">
                            <div className="d-flex justify-content-between">
                                <span>Last Name</span>
                                <span className="float-right"><i className="fas fa-sort"></i></span>
                            </div>                        
                        </th>
                        <th scope="col">
                            <div className="d-flex justify-content-between">
                                <span>First Name</span>
                                <span className="float-right"><i className="fas fa-sort"></i></span>
                            </div>
                        </th>
                        <th scope="col">
                            <div className="d-flex justify-content-between">
                                <span>Start Date</span>
                                <span className="float-right"><i className="fas fa-sort"></i></span>
                            </div>
                        </th>
                        <th scope="col">
                            <div className="d-flex justify-content-between">
                                <span>Department</span>
                                <span className="float-right"><i className="fas fa-sort"></i></span>
                            </div>
                        </th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { employeesOrderByDefault && employeesOrderByDefault.map((emp, index) => (
                        <tr key={`empl-${index}`}>
                            <th scope="row">{emp.lastName}</th>
                            <td>{emp.firstName}</td>
                            <td>{formatDate(emp.startDate)}</td>
                            <td>{emp.department}</td>                        
                            <td><i className="fas fa-eye"></i></td>
                        </tr>
                    ))}                
                </tbody>
            </table>
        </div>
    )
}

export default EmployeesTable