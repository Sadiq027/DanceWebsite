const express = require("express");
const path = require("path");
// const fs = require("fs");
const bodyparser= require("body-parser")

// Getting Started with Mongoose 
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/ContactDance');
}

// Creating Schema of Mongoose
const ContactSchema = new mongoose.Schema({
    name: String,
    Phone: String,
    email: String,
    address: String,
    Concern: String
  });

  const Contact = mongoose.model('contact', ContactSchema);


const app = express();
const port = 80;

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {};
    res.status(200).render('Home.pug', params);
});
app.get('/contact', (req, res)=>{
    const params = {};
    res.status(200).render('Contact.pug', params);
});
app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("The item has been saved successfully!!")
    }).catch(()=>{
        res.status(400).send("error occurred during saving the data ")
    });
    // res.status(200).render('Contact.pug' );
});



// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});