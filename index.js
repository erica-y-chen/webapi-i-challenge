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

//add new user 
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

// //get specific user by id 
// server.get('/users/:id')
//     db.findById(user => {
//         res.status(201).json(user)
//     })

//delete users 

server.delete('/users/:id', (req, res) => {
    const userID = req.params.id; 
    db.remove(userID).then(deleted => {
        res.status(204).end(); //sends back response to the client saying successful
    }) .catch(err => {
        //handle error
        res.status(500).json({error: err, message: 'error deleting the user'});
    });
});

server.listen(5000, () => {
    console.log('\n*** API running on port 5k ***\n');
  });
