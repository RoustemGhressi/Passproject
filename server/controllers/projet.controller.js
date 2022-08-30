const mongoose = require("mongoose");
const Project = mongoose.model("Project");
const toId= mongoose.Types.ObjectId;



module.exports.ajouterP = (req, res, next) => {
    var projet = new Project(); 
    projet.projectName = req.body.projectName;
    projet.Company = req.body.Company;
    projet.Category = req.body.Category;
    projet.Access = req.body.Acces
    projet.save((err, doc) => {
      if (!err) res.send(doc);
      else console.log(err);
    });
  };

  module.exports.afficherP = (req, res, next) => {
    Project.find((err, docs) => {
        if (!err) {
          res.send(docs);
        } else {
          console.log("Error");
        }
      });
    };

   