const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Actie = require("../../models/Acties");

// Authenticatie verwijderen = passport.authenticate("jwt", { session: false }), -lijntje in commentaar zetten

// @route	GET api/acties/test
// @desc	Tests acties route
// @access	Public
router.get("/test", (req, res) => res.json({ msg: "Acties works" }));

// @route	GET api/acties
// @desc	Acties ophalen
// @access	Public
router.get("/", (req, res) => {
  // console.log(req.body);
  Actie.find()
    .sort({})
    .then((acties) => res.json(acties))
    .catch((err) => {
      console.log(err);
      return res.json(err);
    });
});

// @route	POST api/acties
// @desc	Nieuwe actie aanmaken / editten
// @access	Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //   if (1) {
    //     const response = { status: "OK" };
    //     return res.status(400).json(response);
    //   }
    console.log(req.body);

    const newActie = new Actie({ ...req.body });

    const editAction = { ...req.body };

    Actie.findOne({ _id: req.body._id }).then((actie) => {
      if (actie) {
        // UPDATE
        console.log("aanpassing actie");
        delete actie._id;
        Actie.findOneAndUpdate(
          { _id: actie._id },
          { $set: editAction },
          { new: true }
        )
          .then((actie) => res.json(actie))
          .catch((err) => {
            console.log(err);
            return res.json(err);
          });
      } else {
        // CREATE NEW
        console.log("nieuwe actie");
        newActie
          .save()
          .then((actie) => res.json(actie))
          .catch((err) => {
            console.log(err);
            return res.json(err);
          });
      }
    });
  }
);

// @route	DELETE api/acties
// @desc	Actie deleteten zonder authenticatie
// @access	Public

// router.delete("/:id", (req, res) => {
//   console.log(req.params.id);
//   Actie.findById(req.params.id)
//     .then((actie) => {
//       actie.remove().then(() => res.json({ success: "success" }));
//     })
//     .catch((err) => {
//       console.log(err);
//       return res.json(err);
//     });
// });

// @route	DELETE api/acties
// @desc	Actie deleteten met authenticatie
// @access	Private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.params.id);
    Actie.findById(req.params.id)
      .then((actie) => {
        actie.remove().then(() => res.json({ success: "success" }));
      })
      .catch((err) => {
        console.log(err);
        return res.json(err);
      });
  }
);

module.exports = router;
