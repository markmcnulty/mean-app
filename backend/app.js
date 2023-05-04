const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./models/post");

const app = express();

mongoose
  .connect(
    "mongodb+srv://markmcnulty84:Dexxol.18@cluster0.oa2hobg.mongodb.net/node-angular?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB!!");
  })
  .catch(() => {
    console.log("Connection Failed!!");
  });

app.use(bodyParser.json());

//Allowing access to CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT");
  next();
});

//connecting angular so that I can post data
app.post("/api/posts", (req, res, next) => {
  //new post managed by mongoose
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });

  //The following will save it to the MongoDB collection named posts
  post.save();
  res.status(201).json({
    message: "Post added successfully!",
  });
});

//Handling GET Requests
app.get("/api/posts", (req, res, next) => {
  Post.find().then((dbPosts) => {
    return res.status(200).json({
      message: "posts fetched successfully",
      posts: dbPosts,
    });
  });
});

//DELETE posts
app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post Deleted!" });
  });
});

module.exports = app;
