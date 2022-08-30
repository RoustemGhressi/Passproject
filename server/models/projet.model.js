const mongoose = require("mongoose");

var projectSchema = new mongoose.Schema({
    projectName: {
      type: String,
      required: true,
    },
    Company: {
      type: String,
      required: true,
    },
    Category: {
        type: String,
        required: true,
      },
    Access:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Access" 
    }],
  
   
   
  });

  mongoose.model("Project", projectSchema);



