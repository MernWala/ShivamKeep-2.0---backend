const express = require('express');
const User = require('../model/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');   // this will help to hash the password
const jwt = require('jsonwebtoken');

const JWT_Secret = "HulkIsSoP@werf&ll"

const router = express.Router();
router.post('/createuser', [
    // create a user using POST "/api/auth/createuser". No login required
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

        let salt = bcrypt.genSaltSync(10);
        let secPass = await bcrypt.hash(req.body.password, salt);

        // creating users
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authTocken = jwt.sign(data, 'shhhhh');

        // send response that this user is created
        // res.json(user)
        res.json({authTocken});

    } catch (err) {
        // catching unknown erros
        console.error(err);
        res.status(500).send("Some error occured")
    }

})

module.exports = router;