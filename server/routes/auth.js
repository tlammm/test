const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");

router.post("/signup", (req, res) => {
  const { username, password, confirmPassword, pic, role } = req.body;
  if (!username || !password || !confirmPassword) {
    return res.json({ error: "Please add all the fields" });
  }
  if (password.length < 6) {
    return res.json({ error: "Password has to be at least 6 characters" });
  }
  if (password !== confirmPassword) {
    return res.json({ error: "Password does not match" });
  }

  User.findOne({ username: username })
    .then((savedUser) => {
      if (savedUser) {
        return res.json({ error: "This username has already been used!" });
      }

      bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new User({
          username,
          password: hashedpassword,
          pic: pic,
          role,
        });
        user
          .save()
          .then((user) => {
            res.json({ message: "Sign up successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/signin", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.json({ error: "Please enter username or password!" });
  }
  User.findOne({ username: username }).then((savedUser) => {
    if (!savedUser) {
      res.json({ error: "Invalid username or password!" });
    }

    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          //   res.json({ message: "Signed in Successfully!" });
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          const { _id, username, pic, role } = savedUser;
          res.json({ token, user: { _id, username, pic, role } });
        } else {
          res.json({ error: "Invalid username or password!" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
module.exports = router;
