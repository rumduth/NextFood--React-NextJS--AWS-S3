const mongoose = require("mongoose");
const Food = require("./FoodSchema");
const { configDotenv } = require("dotenv");

configDotenv();
const url = process.env.DATABASE_URL;

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  try {
    await mongoose.connect(url);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to database");
  }
}

async function getAllMeals() {
  try {
    await connectDB();
    const result = await Food.find();
    return result;
  } catch (err) {
    console.error("Error finding meals:", err);
    throw new Error("Fail to find all foods");
  }
}

async function getMeal(slug) {
  try {
    await connectDB();
    const result = await Food.findOne({ slug: slug });
    if (!result) throw new Error("Meal not found");
    return result.toObject();
  } catch (err) {
    console.error("Error finding meal:", err);
    throw new Error("Fail to get food");
  }
}

async function saveMeal(data) {
  try {
    await connectDB();
    await Food.insertOne(data);
  } catch (err) {
    throw new Error("Fail to add your food");
  }
}

module.exports = {
  getAllMeals,
  getMeal,
  saveMeal,
};
