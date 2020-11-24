const bcrypt = require('bcryptjs');
const router = require('express').Router();
const db = require('./registrationModel.js');

router.post('/', async (req, res) => {
    try {
        const cred = req.body;
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(cred.password, salt, async function (err, hash) {
                if (err) { console.log(err); throw err }
                else {
                    const userId = await db.createUser({
                        salt,
                        saltedHash: hash,
                        username: cred.username,
                        email: cred.email
                    });
                    res.status(200).json({message: "user created", userId})
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
        const users = await db.getUsers();
        res.status(200).json({users})
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
})

module.exports = router;