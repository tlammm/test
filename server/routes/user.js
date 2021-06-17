const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Post = mongoose.model("Post");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");

router.get("/user/:id", requireLogin, (req, res) => {
  User.findOne({ _id: req.params.id })
    .then("-password")
    .then((user) => {
      Post.find({ postedBy: req.params.id })
        .populate("postedBy", "_id username")
        .populate("comments.postedBy", "_id username pic")
        .exec((err, posts) => {
          if (err) {
            return res.json({ error: err });
          }
          res.json({ user, posts });
        });
    })
    .catch((err) => {
      return res.json({ error: "User not found" });
    });
});

router.put("/changepic", requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { pic: req.body.pic } },
    { new: true },
    (err, result) => {
      if (err) {
        return res.json({ error: "Pic cannot be changed" });
      }
      res.json(result);
    }
  );
});

router.put("/changepassword", requireLogin, async (req, res) => {
  console.log("change password");
  try {
    const password = await bcrypt.hash(req.body.password, 12);
    User.findByIdAndUpdate(req.user._id, { password: password }, { new: true });
    return res.json({ data: "Password has been changed!" });
  } catch (error) {
    return res.json({ error: "Error occured" });
  }
});

router.get("/allusers", (req, res) => {
  User.find()
    .then((users) => {
      res.json({ users });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/deleteuser/:id", requireLogin, (req, res) => {
  User.findByIdAndDelete({ _id: req.params.id }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      Post.deleteMany({ postedBy: result._id }).then((result) =>
        res.json(result)
      );
    }
  });
});

module.exports = router;
