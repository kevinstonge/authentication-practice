const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('./loginModel.js');

router.post('/', async (req, res) => {
    try {
        const [userObject] = await Users.findByUserName(req.body.username);
        if (userObject) {
            const valid = await bcrypt.compare(req.body.password, userObject.saltedHash)
            if (valid) {
                //TODO: generate AUTH token
                res.status(200).json({ message: `${req.body.username}, you are now logged in!` });
            } else {
                res.status(401).json({ message: `incorrect password` })
            }   
        }
        else {
            res.status(401).json({ message: `no such user` });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error})
    }  
})
  
module.exports = router