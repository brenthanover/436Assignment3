var express = require('express');
var router = express.Router();


router.get('/', (req, res, next) => {
    res.render('index', { title: 'Assignment 3' });
});

module.exports = router;