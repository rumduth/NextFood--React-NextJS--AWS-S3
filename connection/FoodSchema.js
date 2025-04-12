const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  image: { type: String, required: true },
  summary: { type: String, required: true },
  creator: { type: String, required: true },
  creator_email: { type: String, required: true },
  instructions: { type: String, require: true },
});

module.exports = mongoose.models.Food || mongoose.model("Food", foodSchema);
