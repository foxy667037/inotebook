const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

// Signature:
const JWT_SECRET = "Iam$Foxy";

// ROUTE 1: Create a User using: POST "/api/auth/createuser" . Doesn't require authentication
router.post(
  "/createuser",
  [
    body("name", "Enter valid name").notEmpty().isLength({ min: 3 }),
    body("email", "Enter valid email address").notEmpty().isEmail(),
    body("password", "Enter password minimum 5 characters")
      .notEmpty()
      .isLength({ min: 5 }),
  ],
  async (req, res) => {
    // If there are errors, Return bad request:
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.send({ errors: result.array() });
    }

    try {
      // Check whether the user with this email already exist:
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Sorry a user already exists" });
      }

      // Hashing Password:
      const salt = await bcrypt.genSalt(10);
      secretPassword = await bcrypt.hash(req.body.password, salt);

      // if (user) = false, then user create:
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secretPassword,
      });

      // Generate Json Web Token:
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error accured");
    }
  }
);

// ROUTE 2: Authenticate a user to login using: POST "/api/auth/loginuser" . Doesn't require authentication
router.post(
  "/loginuser",
  [
    body("email", "Enter valid email address").notEmpty().isEmail(),
    body("password", "Enter password minimum 5 characters")
      .notEmpty()
      .isLength({ min: 5 }),
  ],
  async (req, res) => {
    // If there are errors, Return bad request:
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    // decrypt email and password
    const { email, password } = req.body;

    try {
      // check email:
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Input Wrong Credentials" });
      }

      // check password:
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Input Wrong Credentials" });
      }

      // Generate Json Web Token:
      const payload = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(payload, JWT_SECRET);
      res.json({ authToken, password });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error accured");
    }
  }
);

// ROUTE 3: Get loggedin  user details using: POST "/api/auth/getuser" . Doesn't require authentication
router.post(
  "/getuser",
  fetchuser,
  [
    body("email", "Enter valid email address").notEmpty().isEmail(),
    body("password", "Enter password minimum 5 characters")
      .notEmpty()
      .isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error accured");
    }
  }
);

module.exports = router;
