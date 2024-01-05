const { Router } = require("express");
const adminMiddleware = require("../middlewares/admin");
const { Admin, User, blogs } = require("../db");
const JWT_SECRET = "HARKIRAT SINGH";
const router = Router();
const jwt = require("jsonwebtoken");
// const express = require("express");
// const app = express();

//Admin sign-up functionality
router.post("/signup", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  res.status(200).json({
    msg: "Got it!",
  });
  Admin.findOne({
    username: username,
    password: password,
  }).then(function (value) {
    if (value) {
      res.status(403).json({
        msg: "User already exists",
      });
    } else {
      Admin.create({
        username: username,
        password: password,
      }).then(function (value) {
        res.status(200).json({
          msg: "Admin successfully created",
        });
      });
    }
  });
});

//Admin sign-in functionality
router.post("/signin", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const existingAdmin = await Admin.findOne({
    username: username,
    password: password,
  });

  if (existingAdmin) {
    const token = jwt.sign({ username }, JWT_SECRET);
    res.status(200).json({
      msg: token,
    });
  } else {
    res.status(403).json({
      msg: "Admin not found",
    });
  }
});
//Get all the users
router.get("/users", adminMiddleware, async function (req, res) {
  const users = await User.find({});
  res.status(200).json({
    msg: "Here are all the users",
    users: users,
  });
});

//delete a particular user
router.delete("/:userid", adminMiddleware, async function (req, res) {
  const _id = req.params.userid;
  const existingUser = await User.findOne({ _id });
  try {
    if (existingUser) {
      await User.deleteOne({ _id });
      res.status(200).json({
        msg: "User successfully deleted",
      });
    } else {
      res.status(404).json({
        msg: "User not found",
      });
    }
  } catch (err) {
    res.status(404).json({
      msg: "Encountered some error",
    });
  }
});
module.exports = router;
