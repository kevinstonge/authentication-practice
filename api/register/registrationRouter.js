const bcrypt = require('bcryptjs');
const router = require('express').Router();
const Users = require('./registrationModel.js');

const checkIfUsernameExists = async (req,res,next) => {
    try {
        const [user] = await Users.getUserByUsername(req.body.username);
        user ? res.status(401).json({message: "user already exists"}) : next();
    }
    catch (error) {
        throw error;
    }
}

router.post('/', checkIfUsernameExists, async (req, res) => {
    try {
        const cred = req.body;
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(cred.password, salt, async function (err, hash) {
                if (err) { console.log(err); throw err }
                else {
                    try {
                        const userId = await Users.createUser({
                            salt,
                            saltedHash: hash,
                            username: cred.username,
                            email: cred.email
                        });
                        res.status(200).json({ message: "user created", userId })
                    }
                    catch (error) {
                        console.log(error);
                        res.status(500).json({message: "error creating user"})
                    }
                }
            });
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
})

router.get('/', async (req, res) => {
    try {
        const users = await Users.getUsers();
        res.status(200).json({users})
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
})

module.exports = router;