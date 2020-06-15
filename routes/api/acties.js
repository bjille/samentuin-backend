const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Actie = require("../../models/Acties");

// @route	GET api/acties/test
// @desc	Tests acties route
// @access	Public
router.get("/test", (req, res) => res.json({ msg: "Acties works" }));

// @route	GET api/acties
// @desc	Acties ophalen
// @access	Public
router.get("/", (req, res) => {
  Actie.find()
    .sort({})
    .then((acties) => res.json(acties).catch((err) => res.status(404)));
});

// @route	POST api/acties
// @desc	Actie creeren met authenticatie
// @access	Public
// router.post(
//   "/",
//   passport.authenticate("jwt", { session: false }, (req, res) => {
//     const newActie = new Actie({
//       naam: req.body.naam,
//       perceelnummer: req.body.perceelNummer,
//       actieStartDate: req.body.actieStartDate,
//       actieEndDate: req.body.actieEndDate,
//       serre: req.body.serre,
//       boolWater: req.body.boolWater,
//       opmerking: req.body.opmerking,
//       type: req.body.type,
//       childActions: req.body.childActions,
//       linkedId: req.body.linkedId,
//     });

//     newActie.save().then((actie) => res.json(actie));
//   })
// );

// @route	POST api/acties
// @desc	Actie creeren zonder authenticatie
// @access	Public
router.post("/", (req, res) => {
  //   if (1) {
  //     const response = { status: "OK" };
  //     return res.status(400).json(response);
  //   }
  console.log(req.body);
  const newActie = new Actie({
    naam: req.body.naam,
    perceelnummer: req.body.perceelNummer,
    actieStartDate: req.body.actieStartDate,
    actieEndDate: req.body.actieEndDate,
    serre: req.body.serre,
    boolWater: req.body.boolWater,
    opmerking: req.body.opmerking,
    type: req.body.type,
    childActions: req.body.childActions,
    linkedId: req.body.linkedId,
  });

  newActie
    .save()
    .then((actie) => res.json(actie))
    .catch((err) => res.json(err));
});

router.get("/", (req, res) => {
  res.json();
});

module.exports = router;
