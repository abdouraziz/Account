const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router();

//@router       POST api/users
//@desc         Register user
//@access       Public

router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Email is not valid").isEmail(),
    check("password", "Password must to be at less 6 charactere").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, password2 } = req.body;

    try {
      let user = await User.findOne({ email });
      console.log(user);
      if (user) {
        return res.status(400).json({ msg: "Email already exist" });
      }
      user = new User({ name, email, password });
      const hash = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, hash);
      const newUser = await user.save();
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("secretJwt"),
        {
          expiresIn: 36000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

module.exports = router;
