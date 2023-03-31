const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    obj = {
        name: "Shivam Kashyap",
        age: 21
    }
    res.status(200).json(obj);
})

module.exports = router;