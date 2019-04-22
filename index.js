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
    res.json({ error: err, message: 'The users information could not be retrieved.' });
    });
});


//add new user 
server.post('/users', (req,res) => {
    //axios.post(url,data)=> data shows up as body on the server
    for(let key of Object.keys(req.body)) {
        if(!['name', 'bio'].includes(key)) {
            return res.status(400).json({
                message: "Please provide name and bio for the user."
            })
        }
    }

    const userInformation = {
        name: req.body.name,
        bio: req.body.bio,
    }
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

server.put('/users/:id', (req, res) => {
    const userId= req.params.id
    const userInformation = req.body;
    
    db.update(userId, userInformation)
    .then(count => {
        res.status(200).json(count);
    }).catch(err => {
        //handle error
        res.json({ error: err, message: 'cannot update user' });
    });
});

server.get('/users/:id', (req, res) => {
    const userId= req.params.id

    db
        .findById(userId)
        .then(user => {
        res.status(200).json(user);
        })
        .catch(err => {
        // handle error
        res.json({ error: err, message: 'he user with the specified ID does not exist.' });
        });
    });

    
//delete users 

server.delete('/users/:id', (req, res) => {
    const userID = req.params.id; 
    db.remove(userID).then(deleted => {
        res.status(204).end(); //sends back response to the client saying successful
    }) .catch(err => {
        //handle error
        res.status(404).json({error: err, message: 'message: "The user with the specified ID does not exist'});
    });
});

server.listen(5000, () => {
    console.log('\n*** API running on port 5k ***\n');
  });
