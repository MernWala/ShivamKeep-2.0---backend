const express = require('express');
const User = require('../model/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');

// create a user using POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', "Enter valid name").isLength({ min: 3 }),
    body('email', "Enter valid mail Id").isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    // if there are errors, return Bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check whether the user with this email exists already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry, user with this email already exists" })
        }

        // creating users
        user = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
        })
        
        // send response that this user is created
        req.send(user)

    } catch (err) {
        // catching unknown erros
        console.error(err);
        res.status(500).send("Some error occured")
    }

})

module.exports = router;