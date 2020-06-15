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

router.post("/", (req, res) => {
  //   if (1) {
  //     const response = { status: "OK" };
  //     return res.status(400).json(response);
  //   }
  //   console.log(req.body);

  const newActie = new Actie({
    naam: req.body.naam,
    perceelNummer: req.body.perceelNummer,
    actieStartDate: req.body.actieStartDate,
    actieEndDate: req.body.actieEndDate,
    serre: req.body.serre,
    boolWater: req.body.boolWater,
    opmerking: req.body.opmerking,
    type: req.body.type,
    childActions: req.body.childActions,
    linkedId: req.body.linkedId,
  });

  const editAction = {
    naam: req.body.naam,
    perceelNummer: req.body.perceelNummer,
    actieStartDate: req.body.actieStartDate,
    actieEndDate: req.body.actieEndDate,
    serre: req.body.serre,
    boolWater: req.body.boolWater,
    opmerking: req.body.opmerking,
    type: req.body.type,
    childActions: req.body.childActions,
    linkedId: req.body.linkedId,
  };

  Actie.findOne({ _id: req.body._id }).then((actie) => {
    console.log("request id = " + req.body._id);
    // console.log(actie);
    if (actie) {
      //   console.log("updateactie");
      console.log(editAction);
      // UPDATE
      delete actie._id;
      //   console.log(newActie);
      Actie.findOneAndUpdate(
        { _id: actie._id },
        { $set: editAction },
        { new: true }
      )
        .then((actie) => res.json(actie))
        .catch((err) => res.json(err));
    } else {
      //   console.log("newactie");
      // CREATE NEW
      newActie
        .save()
        .then((actie) => res.json(actie))
        .catch((err) => res.json(err));
    }
  });
});

// @route	GET api/acties
// @desc	Acties ophalen zonder authenticatie
// @access	Public

router.delete("/:id", (req, res) => {
  Actie.findById(req.params.id)
    .then((actie) => {
      actie.remove().then(() => res.json({ success: "success" }));
    })
    .catch((err) =>
      res.status(404).json({ actionnotfound: "geen acties gevonden" })
    );
});

// @route	DELETE api/acties
// @desc	Actie deleteten met authenticatie
// @access	Private

// router.delete(
//   "/:id",
//   passport.authenticate("jwt", { session: false }, (req, res) => {
//     Actie.findById(req.params.id)
//       .then((actie) => {})
//       .catch((err) =>
//         res.status(404).json({ actionnotfound: "geen acties gevonden" })
//       );
//   })
// );

// @route	POST api/acties
// @desc	Actie creeren met authenticatie
// @access	Private
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

router.get("/", (req, res) => {
  res.json();
});

module.exports = router;
