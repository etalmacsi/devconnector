const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//load validation

const validateProfileInput = require("../../validation/profile");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

//@route    GET api/profile/test
//@desc     tests profile route
//@acces    public
router.get("/test", (req, res) => res.json({ msg: "profile works" }));

//@route    GET api/profile
//@desc     get current user profile
//@acces    private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route    POST api/profile
//@desc     create or edit user profile
//@acces    private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check validation

    if (!isValid) {
      return res.status(400).json(errors);
    }
    // Get fields
    const profileField = {};
    profileField.user = req.user.id;
    if (req.body.handle) profileField.handle = req.body.handle;
    if (req.body.company) profileField.company = req.body.company;
    if (req.body.website) profileField.website = req.body.website;
    if (req.body.location) profileField.location = req.body.location;
    if (req.body.bio) profileField.bio = req.body.bio;
    if (req.body.status) profileField.status = req.body.status;
    if (req.body.guthubusername)
      profileField.guthubusername = req.body.guthubusername;
    // Skills
    if (typeof req.body.skills !== "undefined") {
      profileField.skills = req.body.skills.split(",");
    }
    //Social
    profileField.social = {};
    if (req.body.youtube) profileField.social.youtube = req.body.youtube;
    if (req.body.twitter) profileField.social.twitter = req.body.twitter;
    if (req.body.facebook) profileField.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileField.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileField.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileField },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // create

        // check if handle exist
        Profile.findOne({ handle: profileField.handle }).then(profile => {
          if (profile) {
            errors.hadnle = "That handle already exist";
            res.status(404).jon(errors);
          }
          // create or save profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

module.exports = router;
