
const viewAllDepartments = 'SELECT * FROM department'

const viewAllRoles = 'SELECT rl.id, rl.title, dp.name AS department, rl.salary FROM role AS rl LEFT JOIN department AS dp ON rl.department_id = dp.id'

const viewAllEmployees = 'SELECT emp.id, emp.first_name, emp.last_name, rl.title, dp.name AS department, rl.salary, CONCAT(mng.first_name, " ", mng.last_name) as manager FROM employee AS emp LEFT JOIN employee as mng ON mng.id = emp.manager_id LEFT JOIN role AS rl ON emp.role_id = rl.id LEFT JOIN department AS dp ON rl.department_id = dp.id'

const addDepartment = (department) => {
    return `INSERT INTO department (name) VALUES ('${department}')`
};

const addRole = (role, salary, department) => {
    return `INSERT INTO role (title, salary, department_id) VALUES ('${role}', ${salary}, ${department})`
};

const addEmployee = (firstName, lastName, role, manager) => {
   return  `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', ${role}, ${manager})`
}

const updateEmployee = (employee, role) => {
  return  `UPDATE employee SET role_id = ${role} WHERE id = ${employee}`
}


module.exports = {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployee
}