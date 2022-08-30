const mongoose = require("mongoose");
const User = mongoose.model("User");
const passport = require("passport");
const _ = require("lodash");
const speakeasy = require("speakeasy");
const { use } = require("passport");
const QRcode = require("qrcode");

module.exports.register = (req, res, next) => {
  const secret = speakeasy.generateSecret();
  var user = new User();
  user.nom= req.body.nom;
  user.prenom=req.body.prenom;
  user.email = req.body.email;
  user.password = req.body.password;
  user.secretcode = secret;
  user.qrconfirm = "false";
  user.save((err, doc) => {
    if (!err) res.send(doc);
    else console.log(err);
  });
};

module.exports.authenticate = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(400).json(err);
    else if (user)
      return res
        .status(200)
        .json({
          userId: user._id,
          token: user.generateJwt(),
          reftoken: user.RefreshToken(),
          qrconfirm: user.qrconfirm,
        });
    else return res.status(404).json(info);
  })(req, res);
};

module.exports.userProfile = (req, res, next) => {
  User.findOne({ _id: req._id }, (err, user) => {
    if (!user)
      return res
        .status(404)
        .json({ status: false, message: "utilisateur introuvable" });
    else
      return res
        .status(200)
        .json({ status: true, user: _.pick(user, ["email"]) });
  });
};

module.exports.twoFauthVerify = (req, res) => {
  const { token, userId } = req.body;
  try {
    User.findOne({ _id: userId }, (err, user) => {
      const { base32: secret } = user.secretcode;
      const verified = speakeasy.totp.verify({
        secret,
        encoding: "base32",
        token,
      });
      if (verified) {
        res.json({ verified: true });
      } else {
        res.json({ verified: false });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error" });
  }
};

module.exports.twoFauthValidate = (req, res) => {
  const { token, userId } = req.body;
  try {
    User.findOne({ _id: userId }, (err, user) => {
      const { base32: secret } = user.secretcode;
      const validated = speakeasy.totp.verify({
        secret,
        encoding: "base32",
        token,
        window: 1,
      });
      if (validated) {
        res.json({ validated: true });
      } else {
        res.json({ validated: false });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error" });
  }
};

module.exports.getqrcode = (req, res) => {
  const userId = req.body.userId;
  User.findOneAndUpdate(
    { _id: userId },
    { $set: { qrconfirm: "true" } },
    (err, user) => {
      const { otpauth_url: url } = user.secretcode;
      QRcode.toDataURL(url, (err, data_url) => {
        res.status(200).send({ data_url: data_url, qrconfirm: user.qrconfirm });
      });
    }
  );
};

module.exports.listofusers = (req, res) => {
  User.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("Error");
    }
  });
};


