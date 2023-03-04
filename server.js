const express = require('express');
const {display, db} = require('./helper/inquirer')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



display(true);