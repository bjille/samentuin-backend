const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ActieSchema = new Schema({
  naam: { type: String, required: true },
  perceelNummer: { type: String, required: false },
  actieStartDate: { type: String, required: true },
  actieEndDate: { type: String, required: false },
  serre: { type: Boolean, required: false },
  boolWater: { type: Boolean, required: false },
  opmerking: { type: String, required: false },
  type: { type: String, required: true },
  childActions: { type: Array, required: false },
  linkedId: { type: String, required: false },
});

module.exports = Actie = mongoose.model("acties", ActieSchema);
