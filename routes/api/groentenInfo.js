const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const GroentenInfo = require("../../models/GroentenInfo");

// @route	GET api/groenteninfo/test
// @desc	Tests groenteninfo route
// @access	Public
router.get("/test", (req, res) => res.json({ msg: "Groenteninfo works" }));

// @route	GET api/groenteninfo
// @desc	groenteninfo ophalen
// @access	Public
router.get("/", (req, res) => {
  GroentenInfo.find()
    .sort({})
    .then((groenteninfo) => {
      console.log(groenteninfo);
      return res.json(groenteninfo);
    })
    .catch((err) => {
      console.log(err);
      return res.status(404);
    });
});

router.post("/", (req, res) => {
  //   if (1) {
  //     const response = { status: "OK" };
  //     return res.status(400).json(response);
  //   }
  // console.log(req.body);

  const newGroenteinfo = new GroentenInfo({ ...req.body });

  const editAction = { ...req.body };

  GroentenInfo.findOne({ id: req.body._id })
    .then((groente) => {
      console.log("request id = " + req.body);
      if (groente) {
        console.log("updateGroenteinfo");
        // UPDATE
        delete groente._id;
        GroentenInfo.findOneAndUpdate(
          { _id: groente._id },
          { $set: editAction },
          { new: true }
        )
          .then((groente) => res.json(groente))
          .catch((err) => res.json(err));
      } else {
        // CREATE NEW
        console.log("newGroenteinfo");
        newGroenteinfo
          .save()
          .then((groente) => res.json(groente))
          .catch((err) => res.json(err));
      }
    })
    .catch((err) => {
      console.log(err);
      return res.json(err);
    });
});

module.exports = router;
