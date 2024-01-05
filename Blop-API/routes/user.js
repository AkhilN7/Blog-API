const { Router } = require("express");
const userMiddleware = require("../middlewares/user");
const { Admin, User, blogs } = require("../db");
const JWT_SECRET = "HARKIRAT SINGH";
const router = Router();
const jwt = require("jsonwebtoken");
const adminMiddleware = require("../middlewares/admin");

//User sign-up
router.post("/signup", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  res.status(200).json({
    msg: "Got it!",
  });
  User.findOne({
    username: username,
    password: password,
  }).then(function (value) {
    if (value) {
      res.status(403).json({
        msg: "User already exists",
      });
    } else {
      User.create({
        username: username,
        password: password,
      }).then(function (value) {
        res.status(200).json({
          msg: "User successfully created",
        });
      });
    }
  });
});

//User sign-in
router.post("/signin", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const existingUser = await User.findOne({
    username: username,
    password: password,
  });

  if (existingUser) {
    const token = jwt.sign({ username }, JWT_SECRET);
    res.status(200).json({
      msg: token,
    });
  } else {
    res.status(403).json({
      msg: "User not found",
    });
  }
});

//user create blogs

router.post("/createblogs", userMiddleware, async function (req, res) {
  const title = req.body.title;
  const description = req.body.description;
  let token = req.headers.authorization;
  let words = token.split(" ");
  const jwttoken = words[1];
  const decoded = jwt.verify(jwttoken, JWT_SECRET);
  const username = decoded.username;
  const blog = await blogs.create({
    title: title,
    description: description,
  });
  console.log(blog._id);
  const user = await User.findOne({
    username: username,
  });
  if (user) {
    user.blogs.push(blog._id);
    user.save();
  }
  //console.log(user);
  res.status(200).json({
    blog: blog,
    user: user,
  });
});

//get all blogs
router.get("/getblogs", adminMiddleware, async function (req, res) {
  const allblogs = await blogs.find({});
  res.status(200).json({
    allblogs,
  });
});

//delete a blog
router.delete("/:blogid", adminMiddleware, async function (req, res) {
  const _id = req.params.blogid;
  let token = req.headers.authorization;
  let words = token.split(" ");
  const jwttoken = words[1];
  const decoded = jwt.verify(jwttoken, JWT_SECRET);
  const username = decoded.username;

  //finding the blog
  const exisingBlog = await blogs.findOne({ _id: _id });
  try {
    if (exisingBlog) {
      await blogs.deleteOne({
        _id: _id,
      });
      const userAll = await User.findOne({ username: username });
      const userblogs = userAll.blogs;
      const index = userblogs.indexOf(_id);
      userblogs.splice(index, 1);
      userblogs.save();
      res.status(200).json({
        msg: "Blog Successfully deleted",
        blogs: blogs,
        user: userAll,
      });
    } else {
      res.status(404).json({
        msg: "Blog not found",
      });
    }
  } catch (err) {
    res.status(404).json({
      msg: "Some error occured",
    });
  }
});

//update a blog
router.put("/:blogid", adminMiddleware, async function (req, res) {
  const blogId = req.params.blogid;
  const title = req.body.title;
  const description = req.body.description;

  try {
    // Use findById instead of find for querying by ID
    const particularBlog = await blogs.findById(blogId);

    if (particularBlog) {
      particularBlog.title = title || particularBlog.title;
      particularBlog.description = description || particularBlog.description;

      // Use save() to update the document
      await particularBlog.save();

      res.status(200).json({
        msg: "Blog updated successfully",
        blog: particularBlog,
      });
    } else {
      res.status(404).json({
        msg: "Blog not found!",
      });
    }
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({
      msg: "Internal server error",
      error: error.message,
    });
  }
});
module.exports = router;
