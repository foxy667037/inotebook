const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');


// Create a User using: POST "/api/auth/" . Doesn't require authentication
router.post('/', [
        body('name', 'Enter valid name').notEmpty().isLength({ min: 3}),
        body('email', 'Enter valid email address').notEmpty().isEmail(),
        body('password', 'Enter password minimum 5 characters').notEmpty().isLength({ min: 5})
    ], 
    (req, res) => {

    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.send({ errors: result.array() });    
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })
    .then(user => res.json(user))
    .catch(err => {
        console.log(err)
        res.json({error: 'Please Enter a unique value for email'})
    });
    
})

module.exports = router;