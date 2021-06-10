const express = require("express");
const router = express.Router();
const Cafe = require("../models/cafe");

router.get("/cafe", (req, res) => {
  let cafePerPage = 10;
  let page = req.params.page || 1;
  Cafe.find().skip((cafePerPage * page) - cafePerPage).limit(cafePerPage).exec((err, cafes) => {
    if(err) throw err;
    res.json(cafes);
  })
});

router.get("/cafe/:page", (req, res) => {
  let cafePerPage = 10;
  let page = req.params.page || 1;
  Cafe.find().skip((cafePerPage * page) - cafePerPage).limit(cafePerPage).exec((err, cafes) => {
    if(err) throw err;
    res.json(cafes);
  })
})

router.post("/cafe", (req, res) => {
  let cafeTmp = new Cafe(req.body);
  cafeTmp.save((err) => {
    if (err) throw err;
    console.log("Save successfully");
  });
  res.json(cafeTmp);
});

router.put("/cafe", (req, res) => {
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

router.delete("/cafe/:id", (req, res) => {
  if (!req.params.id) {
    res.status(400).send({ message: "Can not find your id" });
  }
  let id = { _id: req.params.id };
  Cafe.findByIdAndDelete(id, function (error, result) {
    if (error) throw error;
    else res.json({ message: "deleted successfully" });
  });
});

module.exports = router;
