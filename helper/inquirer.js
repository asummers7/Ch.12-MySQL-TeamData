const mysql = require("mysql2");
const inquirer = require("inquirer");
require('console.table')
const {questions, departmentQuestions, roleQuestions, employeeQuestions, updateQuestions} = require("./questions");
const {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployee,
} = require("./query");


const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    user: "root",
    password: "mysql1887",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);

const display = (isStartUp) => {
  inquirer.prompt(questions(isStartUp)).then((responses) => {
      switch (responses.start) {
        case "View all departments":
            db.query(viewAllDepartments, function (err, results) {
                console.table(results);
                display();
              });
              break;
      case "View all roles":
        db.query(viewAllRoles,function (err, results) {
            console.table(results);
            display();
          });
        break;
      case "View all employees":
        db.query(viewAllEmployees,function (err, results) {
            console.table(results);
            display();
          });
        break;
      case "add a department":
        inquirer.prompt(departmentQuestions)
        .then(responses => {
            db.query(addDepartment(responses.department), function (err, results) {
                console.log('department added!');
                display();
              });
            })
        break;
      case "add a role":
        db.query('SELECT name, id from department', function (err, results) {
            const departmentChoices = results.map(element => {
              return {
                name: element.name,
                value: element.id
              }
            });
            inquirer.prompt(roleQuestions(departmentChoices))
                .then(({role, salary, department_id}) => {
                    db.query(addRole(role, salary,department_id), function(err, results){
                      if(err) {
                        console.log(err);
                        return 
                      };
                      console.log("Roll Successfully Added!"); 
                      display();
                      
                    })
                });
        });
        
        break;
      case "add an employee":
        db.query('select rl.id, rl.title, emp.id as managerNumber, CONCAT(emp.first_name, " ", emp.last_name) as names from role as rl left join employee as emp ON rl.id = emp.role_id', function (err,results){
          const roles = results.map(element => {
            return {
              name: element.title,
              value: element.id
            }
          });
          const managers = results.map(element => {
            return {
              name: element.names,
              value: element.managerNumber,
            }
          });
          inquirer.prompt(employeeQuestions(roles,managers))
          .then((responses) => {
            db.query(addEmployee(responses.employeeFirst, responses.employeeLast, responses.roles, responses.managers), function (err, results) {
              console.log("employee added!");
              display();
            })
          })
        })
        break;
      case "update an employee":
        db.query('select rl.id, rl.title, emp.id as managerNumber, CONCAT(emp.first_name, " ", emp.last_name) as names from employee as emp left join role as rl ON rl.id = emp.role_id', function(err, results) {
          const roles = results.map(element => {
            return {
              name: element.title,
              value: element.id
            }
          });
          const employees = results.map(element => {
            return {
              name: element.names,
              value: element.managerNumber,
            }
          });
          inquirer.prompt(updateQuestions(employees,roles))
          .then(responses => {
            db.query(updateEmployee(responses.employee, responses.role), function (err,results){
              console.log("employee Updated!");
              display();
            })
          })
        })
        break;
      case "nothing":
        break;
    }
  });
};

module.exports = {
    display,
    db
}
