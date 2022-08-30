const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, (err) => {
  if (!err) {
    console.log("connexion database succeeded");
  } else {
    console.log("error");
  }
});

require("./user.model");
require("./projet.model");
require("./access.model");

