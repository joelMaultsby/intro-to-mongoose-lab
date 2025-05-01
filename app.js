const prompt = require('prompt-sync')();

const username = prompt('What is your name? ');
const mongoose = require('mongoose');
const port = 4000;
const express = require('express');
const app = express();


let customers = [];
let nextId = 1;

// Show the main menu
app.get('/', (req, res) => {
    res.send(`
        <h1>Welcome to the Customer Manager</h1>
        <p>What would you like to do?</p>
        <ul>
            <li><a href="/create">Create a Customer</a></li>
            <li><a href="/view">View all Customers</a></li>
            <li><a href="/update">Update a Customer</a></li>
            <li><a href="/delete">Delete a Customer</a></li>
            <li><a href="/quit">Quit</a></li>
        </ul>
    `);
});
 
app.get('/create', (req, res) => {
    const name = prompt("Enter customer name: ");
    customers.push({ id: nextId++, name });
    res.send('<p>Customer created. <a href="/">Back to menu</a></p>');
});


app.get('/view', (req, res) => {
    let customerList = customers.length === 0 ? "Customer not found." : customers.map(c => `ID: ${c.id}, Name: ${c.name}`).join('<br>');
    res.send(`
        <h2>Customers</h2>
        <p>${customerList}</p>
        <a href="/">Back to menu</a>
    `);
});

 
app.get('/update', (req, res) => {
    let customerList = customers.map(c => `ID: ${c.id}, Name: ${c.name}`).join('<br>');
    const id = parseInt(prompt("Enter ID of customer to update: "));
    const customer = customers.find(c => c.id === id);
    if (customer) {
        const newName = prompt("Enter new name: ");
        customer.name = newName;
        res.send('<p>Customer updated! <a href="/">Back to menu</a></p>');
    } else {
        res.send('<p>Customer not found! <a href="/">Back to menu</a></p>');
    }
});

 
app.get('/delete', (req, res) => {
    let customerList = customers.map(c => `ID: ${c.id}, Name: ${c.name}`).join('<br>');
    const id = parseInt(prompt("Enter ID of customer to delete: "));
    const index = customers.findIndex(c => c.id === id);
    if (index !== -1) {
        customers.splice(index, 1);
        res.send('<p>Customer deleted! <a href="/">Back to menu</a></p>');
    } else {
        res.send('<p>Invalid Customer! <a href="/">Back to menu</a></p>');
    }
});

// Quit (end the server)
app.get('/quit', (req, res) => {
    res.send('<p>Goodbye! <a href="/">Back to menu</a></p>');
    process.exit();   
});



console.log("Hello welcome to our App");

console.log(`Your name is ${username}`);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});