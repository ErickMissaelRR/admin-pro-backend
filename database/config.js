const mongoose = require("mongoose");
require('dotenv').config();

const dbConnection = async () => {
    mongoose.set('strictQuery', false);
  try {
    await mongoose.connect(
      process.env.DB_CONNECTION
    );
  } catch (error) {
    throw new Error("Error al inicializar la base de dato", error);
  }

  console.log('Success');
};

module.exports = {
    dbConnection
}
