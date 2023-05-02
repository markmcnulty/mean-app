const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

//Allowing access to CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

//connecting angular so that I can post data
app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: "Post added!",
  });
});

//Handling GET Requests
app.get("/api/posts", (req, res, next) => {
  posts = [
    {
      id: "sdgsddfgr4",
      title: "title 1",
      content: "content 1",
    },
    {
      id: "sdgr3443wesw",
      title: "title 2",
      content: "content 2",
    },
    {
      id: "sdf344f",
      title: "title 3",
      content: "content 3",
    },
  ];

  return res.status(200).json({
    message: "posts fetched successfully",
    posts: posts,
  });
});

module.exports = app;
