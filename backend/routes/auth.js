const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signature:
const JWT_SECRET = "Iam$Foxy"

// Create a User using: POST "/api/auth/user" . Doesn't require authentication
router.post('/user', [
        body('name', 'Enter valid name').notEmpty().isLength({ min: 3}),
        body('email', 'Enter valid email address').notEmpty().isEmail(),
        body('password', 'Enter password minimum 5 characters').notEmpty().isLength({ min: 5})
    ],  async (req, res) => {

    // If there are errors, Return bad request:
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.send({ errors: result.array() });    
    }

    try{
        // Check whether the user with this email already exist:
        let user = await User.findOne({email: req.body.email});
        if (user){
            return res.status(400).json({error:"Sorry a user already exists"});
        }
        
        // Hashing Password:
        const salt = await bcrypt.genSalt(10);
        secretPassword = await bcrypt.hash(req.body.password, salt);

        // if (user) = false, then user create:
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secretPassword,
        })
        
        // Generate Json Web Token:
        const data = {
          user:{
            id: user.id
          }
        } 
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({authToken});
        // res.json(user);

    } catch(error) {
        console.error(error.message);
        res.status(500).send("Some error accured");
    }

})

module.exports = router;