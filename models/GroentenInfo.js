const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const GroentenInfoSchema = new Schema({
  naam: { type: String, required: true },
  Categorie: { type: String, required: true },
  type: { type: String, required: false },
  zaaien_van: { type: String, required: false },
  zaaien_tot: { type: String, required: false },
  verspenen_van: { type: String, required: false },
  verspenen_tot: { type: String, required: false },
  planten_van: { type: String, required: false },
  planten_tot: { type: String, required: false },
  oogsten_van: { type: String, required: false },
  oogsten_tot: { type: String, required: false },
  plantafstand: { type: String, required: false },
});

// const GroentenInfoSchema = new Schema({
//   naam: { type: String, required: true },
// });

module.exports = GroentenInfo = mongoose.model(
  "groenteninfo",
  GroentenInfoSchema
);
