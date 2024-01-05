const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:12345@cluster0.pfk9v8d.mongodb.net/");

const AdminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blogs",
    },
  ],
});

const blogSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const blogs = mongoose.model("blogs", blogSchema);
module.exports = {
  Admin,
  User,
  blogs,
};
