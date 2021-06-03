const express = require("express");
const router = express.Router();
const Cafe = require("./models/cafe");

router.get("/", (req, res) => {
  // res.send("hung");
  return Cafe.find().exec((err, cafes) => {
    if (err) throw err;
    res.json(cafes);
  });
});

router.post("/", (req, res) => {
  let cafeTmp = new Cafe(req.body);
  cafeTmp.save((err) => {
    if (err) throw err;
    console.log("Save successfully");
  });
  res.json(cafeTmp);
});

router.put("/", (req, res) => {
  if (!req.body.id) {
    res.status(400).send({ message: "Can not find your id" });
  }
  let id = { _id: req.body.id };
  let update = req.body;
  Cafe.findByIdAndUpdate(id, update, { new: true }, function (error, result) {
    if (error) throw error;
    res.json(result);
  });
});

router.delete("/:id", (req, res) => {
  if (!req.params.id) {
    res.status(400).send({ message: "Can not find your id" });
  }
  let id = { _id: req.params.id };
  Cafe.findByIdAndDelete(id, function (error, result) {
    if (error) throw error;
    else res.json({ message: id + "deleted successfully" });
  });
});

module.exports = router;