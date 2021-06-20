const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const User = mongoose.model("User");
const Post = mongoose.model("Post");

router.get("/allposts", (req, res) => {
  Post.find()
    .populate("postedBy", "_id username pic")
    .populate("comments.postedBy", "_id username pic")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/savedposts", requireLogin, (req, res) => {
  Post.find({ saved: { $in: req.user._id } })
    .populate("postedBy", "_id username pic")
    .populate("comments.postedBy", "_id username pic")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/createpost", requireLogin, (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.json({ error: "Please enter all fields" });
  }

  req.user.password = undefined;
  const post = new Post({
    title,
    body,
    postedBy: req.user,
  });

  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/mypost", requireLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id username pic")
    .populate("comments.postedBy", "_id username pic")
    .then((mypost) => {
      res.json({ mypost });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/save", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { saved: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate("postedBy", "_id username pic")
    .populate("comments.postedBy", "_id username pic")
    .exec((err, result) => {
      if (err) {
        return res.json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put("/unsave", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { saved: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate("postedBy", "_id username pic")
    .populate("comments.postedBy", "_id username pic")
    .exec((err, result) => {
      if (err) {
        return res.json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put("/like", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate("postedBy", "_id username pic")
    .populate("comments.postedBy", "_id username pic")
    .exec((err, result) => {
      if (err) {
        return res.json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put("/unlike", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate("postedBy", "_id username pic")
    .populate("comments.postedBy", "_id username pic")
    .exec((err, result) => {
      if (err) {
        return res.json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put("/comment", requireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate("postedBy", "_id username pic")
    .populate("comments.postedBy", "_id username pic")
    .exec((err, result) => {
      if (err) {
        return res.json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.delete("/deletepost/:postId", requireLogin, (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate("postedBy", "_id")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      }
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => console.log(err));
      }
    });
});
router.post("/searchuser", (req, res) => {
  let userPattern = new RegExp("^" + req.body.query);
  User.find({ username: { $regex: userPattern } })
    .select("_id username pic")
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/searchtitle/:title", (req, res) => {
  Post.find({ title: { $in: req.params.title } })
    .populate("postedBy", "_id username pic")
    .populate("comments.postedBy", "_id username pic")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;

router.delete("/deletepostadmin/:postId", requireLogin, (req, res) => {
  Post.findByIdAndDelete({ _id: req.params.postId }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
