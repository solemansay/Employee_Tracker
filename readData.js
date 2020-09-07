var inquirer = require("inquirer");
var mysql = require("mysql");
var table = require("console.table");
// const prompts = require("prompts");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "rootroot",
  database: "employee_db"
});

const mainMenu = [
  {
    type: "list",
    message: "What would you like to do?",
    choices: ["View whole Table", "View all employees", "View departments", "View roles", "Add an employee", "Add a role", "Add a new department", "Update an employee's Role", "Exit"],
    name: "mainMenu"
  },
];

const addEmploy = [
  {
    type: "input",
    message: "What is the employee's first name?",
    name: "first_name"
  },
  {
    type: "input",
    message: "What is the employee's last name?",
    name: "last_name"
  },
  {
    type: "list",
    message: "What is the employee's role?",
    choices: ["Lawyer", "Manager", "Accountant", "I.T", "Receptionist", "Sales Lead"],
    name: "role_id"
  },
  {
    type: "list",
    message: "Who is the employee's manager?",
    choices: ["Sarah", "Peter", "Lawrence", "Jack", "Felicia"],
    name: "manager_id"
  }];

const newRole = [
  {
    type: "input",
    message: "What role would you like to add?",
    name: "newRole"
  },
  {
    type: "input",
    message: "What is the salary of this role?",
    name: "newSalary"
  },
  {
    type: "list",
    message: "What is the department of this role?",
    //choices: connection.department.name,
    name: "RoleDeparment",
  },
];

const newDepartment = [
  {
    type: "input",
    message: "What is the name of this new department?",
    name: "newDepartment"
  },
];

// const updateRole = [
//   {
//     type: "list",
//     message: "Which employee's role would you like to update?",
//     choices: [],
//     name: "full_name"
//   },
//   {
//     type: "list",
//     message: "select the employees new role",
//     name: "newRole"
//   }
// ];

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});


function afterConnection() {
  inquirer.prompt(mainMenu).then(function (mainChoice) {

    let choice = mainChoice.mainMenu

    console.log(choice)

    if (choice === "View whole Table") {
      viewtable();
    } else if (choice === "View all employees") {
      viewEmployees();
    } else if (choice === "View departments") {
      viewDepartment();
    } else if (choice === "View roles") {
      viewRoles();
    } else if (choice === "Add an employee") {
      addEmployee();
    } else if (choice === "Add a role") {
      addRole();
    } else if (choice === "Add a new department") {
      addDepartment();
    } else if (choice === "Update an employee's Role") {
      updateEmployeeRole();
    } else {
      connection.end()
    }
  });
};

function addEmployee() {
  inquirer.prompt(addEmploy).then(function (data) {
    console.log(data)
    const { first_name, last_name, manager_id, role_id } = data
    connection.query("INSERT INTO employee SET ?",
      {
        first_name: first_name,
        last_name: last_name,
        manager_id: handleManager(manager_id),
        role_id: handleRoles(role_id)
      }, (err, res) => {
        if (err) throw err;
        // make an array of roles
        console.log(res.affectedRows)
      })

    afterConnection();
  });

};


function handleManager(manager_id) {
  if (manager_id === "Sarah") {
    return 2
  } else if (manager_id === "Peter") {
    return 4
  } else if (manager_id === "Lawrence") {
    return 6
  } else if (manager_id === "Jack") {
    return 7
  } else if (manager_id === "Felicia") {
    return 8
  }
};

function handleRoles(role_id) {
  if (role_id === "Accountant") {
    return 1
  } else if (role_id === "Manager") {
    return 2
  } else if (role_id === "Lawyer") {
    return 3
  } else if (role_id === "I.T") {
    return 4
  } else if (role_id === "Receptionist") {
    return 5
  } else if (role_id === "Sales Lead") {
    return 6
  }
};

function addRole() {
  inquirer.prompt(addRole).then(function (data) {
    console.log(data)
    const { title, salary, department_id } = data
    connection.query("INSERT INTO role SET ?",
      {
        title: title,
        salary: salary,
        department_id: handleDepartment(department_id),
      }, (err, res) => {
        if (err) throw err;
        // make an array of roles
        console.log(res.affectedRows)
      })

    afterConnection();
  });
};

// function handleDepartment(department_id) {
//   if (department_id === "Sarah") {
//     return 2
//   };
// }

async function updateEmployeeRole() {
  let name;
  let role;
  connection.query('SELECT CONCAT(first_name, " ", last_name) AS full_name FROM employee', function (err, data) {  
    if (err) throw err;
    name = data.map(e => e.full_name) 
    console.log(name)
    connection.query('SELECT title FROM role', function(err, res) {
      if(err) throw err
      console.log(res);
      role = res.map(val => val.title);
      inquirer.prompt([
        {
          type: "list",
          message: "Which employee's role would you like to update?",
          choices: name,
          name: "full_name"
        },
        {
          type: "list",
          message: "select the employees new role",
          name: "newRole",
          choices: role
        }
      ]).then(data => {
        console.log(data)
        afterConnection()
      })
    })
     
    // connection.query("SELECT first_name, last_name FROM employee", function (err, res) {
    // if (err) throw err;
  
    // afterConnection();
    // }) 
  }); 

};

function getEmployeeList(fullName) {
  return connection.query('SELECT CONCAT(first_name, " ", last_name) AS full_name FROM employee', function (err, data) {  
    if (err) throw err;
    // const name = data.map(e => e.full_name) 
    // console.log(name)
    //  return name
  }); 
};


function viewEmployees() {
  connection.query("SELECT id, first_name, last_name FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
    afterConnection();
  });
};


function viewDepartment() {
  connection.query("SELECT department_name FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    afterConnection();
  });
};

function viewRoles() {
  connection.query("SELECT title, salary FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
    afterConnection();
  });
};

function viewtable() {
  let tableQuery = "SELECT employee.id, employee.first_name, employee.last_name, role.title,"
  tableQuery += " department.department_name, role.salary, employee.manager_id"
  tableQuery += " FROM department INNER JOIN role"
  tableQuery += " ON department.id = role.department_id INNER JOIN employee"
  tableQuery += " ON employee.role_id = role.id"

  connection.query(tableQuery, function (err, res) {
    if (err) throw err;
    console.table(res);
    afterConnection();
  });
};
