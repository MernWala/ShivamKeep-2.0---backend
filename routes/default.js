const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send("<h2>Welcome to HULK server</h2>");
})

module.exports = router