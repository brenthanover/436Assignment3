var express = require('express');
var router = express.Router();

/* Confirm connectivity */
router.get('/', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

module.exports = router;