// implement your API here
const express = require('express');

//cpackage implemented locally
const db = require('./data/db.js');

const server = express(); 

server.use(express.json());

server.get('/', (req, res) => {
    res.send("It's alive!");
  });
  

server.get('/users', (req, res) => {
db
    .find()
    .then(users => {
    res.status(200).json(users);
    })
    .catch(err => {
    // handle error
    res.json({ error: err, message: 'Something broke' });
    });
});


server.post('/users', (req,res) => {
    //axios.post(url,data)=> data shows up as body on the server
    const userInformation = req.body;
    console.log('request body: ', userInformation)

    db.insert(userInformation)
    .then(user => {
        res.status(201).json(user)
    }).catch(err => {
        // handle error
        res.json({ error: err, message: 'error adding user' });
        });
});


server.listen(5000, () => {
    console.log('\n*** API running on port 5k ***\n');
  });