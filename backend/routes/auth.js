const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');


// Create a User using: POST "/api/auth/" . Doesn't require authentication
router.post('/', [
        body('name', 'Enter valid name').notEmpty().isLength({ min: 3}),
        body('email', 'Enter valid email address').notEmpty().isEmail(),
        body('password', 'Enter password minimum 5 characters').notEmpty().isLength({ min: 5})
    ],  async (req, res) => {

    // If there are errors, Return bad request:
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.send({ errors: result.array() });    
    }

    // Check whether the user with this email already exist:
    try{
            let user = await User.findOne({email: req.body.email});
            if (user){
            return res.status(400).json({error:"Sorry a user already exists"});
        }
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })

        // .then(user => res.json(user))
        // .catch(err => {
        //     console.log(err);
        //     res.json({error: 'Please Enter a unique value for email'});
        // });
        res.json(user);
    } catch(error) {
        console.error(error.message);
        res.status(500).send("Some error accured");
    }

})

module.exports = router;