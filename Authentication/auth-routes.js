const express = require('express');
const router = express.Router();
const bcyrpt = require('bcryptjs');
const generateToken = require('./generateToken');
const USERDB = require('../Services/UserService');
const CONSOLEOUTPUT = require('../Services/consoleOutput')
router.use(express.json());

/**
 * Register a new user into the system
*/
router.post('/register', (req, res) =>{
    console.log(CONSOLEOUTPUT.requestConsole(req));
    const credantials = req.body;
    const { username, password, first_name, last_name } = credantials;
    //make sure user entered both username and password
    if(!(username && password)){
        res.status(400).json({message: "username and password requried"});
    }else{
        const hash = bcyrpt.hashSync(credantials.password, 12);
        credantials.password = hash;
        USERDB.addUser(credantials)
            .then(user => {
                const token = generateToken(credantials);
                id =  user;
                name = first_name + " " + last_name;
                res.status(200).json({token , username, name, id});
            })
            .catch(err => {
                if(err.errno == 19){
                    // err status of nonunique username value
                    res.status(400).json({message: "Username is already taken"});
                }
                else{
                    res.status(500).json({error : "error"});
                }
            })
    }
});

/**
 * Dev method only used to see the array
 */
router.get('', (req, res) =>{
    console.log(CONSOLEOUTPUT.requestConsole(req));
    USERDB.findAllUsers()
    .then(users =>{
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({message : err})
    })
});

/**
 * This allows users delete a specific board topic from the server
 */
router.delete('/:user_id', (req, res) => {
    console.log("here");
    const user_id = req.params.user_id;
    console.log(CONSOLEOUTPUT.requestConsole(req));
    USERDB.removeUser(user_id)
    .then(count =>{
        if(count > 0){
            res.status(200).json({ message: "Deleted"})
        }
        else{
            res.status(404).json({ message: "User cannot be deleted"})
        }
    })
    .catch( error => {
        res.status(500).json({ message: error})
    })
});

/**
 * Login an exisiting user into the system
 */
router.post('/login', (req, res) =>{
    let x  = false;
    console.log(CONSOLEOUTPUT.requestConsole(req));
    const credantials = req.body;
    const { username, password } = credantials;
    //make sure user entered both username and password
    if(!(username && password)){
        res.status(400).json({message: "username and password requried"});
    }else{
        USERDB.findUserByUsername(username)
        .then( user => {
            if (user && bcyrpt.compareSync(password, user.password)){
                const token = generateToken(user);
                name = user.first_name + " " + user.last_name;
                id = user.id;
                res.status(200).json({token , name, id});
            }else{
                res.status(401).json({ message: 'invalid crediantials'});
            }
        })
        .catch(err => {
            res.status(500).json({message : err})
        })
    }
});





module.exports = router
