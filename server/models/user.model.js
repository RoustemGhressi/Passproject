const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

var userSchema = new mongoose.Schema({
  nom:{
    type:String,
    required: true
  },
  prenom:{
    type:String,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  secretcode: {
    type: Object,
  },
  qrconfirm: {
    type: String,
  },
  resetLink:{
    data: String,
    default: ''
  }
});

userSchema.path("email").validate((val) => {
  emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, "Invalid e-mail.");

userSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
    next();
  });
});

userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });
};

userSchema.methods.RefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.REF_SECRET, {
    expiresIn: process.env.REF_EXP,
  });
};

mongoose.model("User", userSchema);
