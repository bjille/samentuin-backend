const express = require("express");
const router = express.Router();

// @route	GET api/acties/test
// @desc	Tests acties route
// @access	Public
router.get("/test", (req, res) => res.json({ msg: "Acties works" }));

module.exports = router;
