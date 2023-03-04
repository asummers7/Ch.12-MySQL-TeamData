const questions = (isStartUp) => [
    {
        type: "input",
        name:"continue",
        message: "Press enter to continue",
        when: !isStartUp
    },
    {
        type: "list", 
        name: "start", 
        message: "What would you like to do?",
        choices: [
            "View all departments", 
            "View all roles", 
            "View all employees",
            "add a department", 
            "add a role",
            "add an employee",
            "update an employee",
            "nothing"
        ]
    }
];

const departmentQuestions = [
    {
        type: 'input',
        name: 'department',
        message: 'What is the name of the Department?'
    }
];

const roleQuestions = (departments) => [
    {
        type: 'input',
        name: 'role',
        message: 'What is the name of the role?'
    },
    {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role?'
    },
    {
        type: 'list',
        name: 'department_id',
        message: 'Which department does the role belong to?',
        choices: departments
    }
];

const employeeQuestions = (roles, managers) => [
    {
        type: 'input',
        name: 'employeeFirst', 
        message: 'What is the employee`s first name?'
    },
    {
        type: 'input',
        name: 'employeeLast', 
        message: 'What is the employee`s last name?'
    },
    {
        type: 'list',
        name: 'roles',
        message: 'What is the role of the employee?',
        choices: roles
    },
    {
        type: 'list',
        name: 'managers',
        message: 'Who is their manager?',
        choices: managers
    }

];

const updateQuestions = (employees, roles) => [
    {
        type: 'list', 
        name: 'employee', 
        message: 'Which employee would you like to update?',
        choices: employees
    },
    {
        type: 'list',
        name: 'role',
        message: 'What is their new role?',
        choices: roles
    }
]


module.exports = {
    questions,
    departmentQuestions,
    roleQuestions,
    employeeQuestions,
    updateQuestions
}