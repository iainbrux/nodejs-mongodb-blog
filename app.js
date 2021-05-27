const express = require("express");

//express app

const app = express();

//register view engine

app.set("view engine", "ejs");

//listen for requests

app.listen(3000);

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Mercy saves Genji",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Cloud9 win LCS",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "The Legion invade Azeroth",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "New Blog" });
});

//404 page

app.use((req, res) => {
  res.status(404).render("404", { title: "Not Found" });
});
