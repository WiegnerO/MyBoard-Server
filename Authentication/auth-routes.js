const express = require('express');
const router = express.Router();
const bcyrpt = require('bcryptjs');
const shortid = require('shortid');
const generateToken = require('./generateToken');

router.use(express.json());

//temporary db for now
const users = [
    {
        "id" : 1,
        "username": "Bob",
        //1234
        "password": "$2a$12$3rjoWqxdTkSCkEmqliWnRuxBnmg51Weeyqfc21UomJHu.vUK.lWp."
    },
    {
        "id" : 2,
        "username": "Obo",
        //4321
        "password": "$2a$12$mq4Itm7uorFWVra/x7oRPeqhNhKmtgmoOjqs7KsAGK0pUVGtwc0a."
    },
    {
        "id" : 3,
        "username": "ff",
        //ff
        "password": "$2a$12$hvvWHpJNhTKNIsIqRSBeU.K637V6rSMWJTJK3ScmZWe3QdZzxNaOy"
    }
];

/**
 * Register a new user into the system
*/
router.post('/register', (req, res) =>{
    console.log('POST requset from api/auth/register has been made');
    const credantials = req.body;
    const { username, password } = credantials;
    //make sure user entered both username and password
    if(!(username && password)){
        res.status(400).json({message: "username and password requried"});
    }else{
        //hash the password
        const hash = bcyrpt.hashSync(credantials.password, 12);
        credantials.password = hash;
        credantials.id = shortid.generate();
        //push the username and the newly hashed password in the "database"
        users.push(credantials);
        res.status(200).json({ message: `${username}` + " is added" });
    }
});

/**
 * Dev method only used to see the array for now will delete later
 */
router.get('', (req, res) =>{
    console.log('GET requset from api/auth has been made');
    res.json(users);
});

/**
 * Login an exisiting user into the system
 */
router.post('/login', (req, res) =>{
    let x  = false;
    console.log('POST requset from api/auth/login has been made');
    const credantials = req.body;
    const { username, password } = credantials;
    //make sure user entered both username and password
    if(!(username && password)){
        res.status(400).json({message: "username and password requried"});
    }else{
        for(i=0 ; i < users.length ; i++){
            if(users[i].username === username){
                if(bcyrpt.compareSync(password, users[i].password)){
                    const token = generateToken(users[i]);
                    x = true;
                    res.status(200).json({ message: `${username} is a logged in user`, token});
                }
            }
        }
        // for now is the else when the DB is added in this wont be nessecary 
        if(!x){
            res.status(500).json({ message: `${username} is not a user`});
        }
    }
});


/**
 * Logout the application 
 */
router.get('/logout', (req, res) =>{
    if (req.session){
        req.session.destroy(err => {
            if(err){
                res.status(500).json({message: 'something went wrong try again'})
            }else{
                res.status(200).json({message: 'you logged out succefully'})
            }
        })
    } else{
        res.status(200).json({message: 'You were already logged out'})
    }
})





module.exports = router