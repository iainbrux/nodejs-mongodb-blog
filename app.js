const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

//express app

const app = express();

//authorise mongoDB

const dbURI =
  "mongodb+srv://iainbrux:yR6SxtjWEPHEDMfw@nodejs-blog.gupeo.mongodb.net/nodejs-blog?retryWrites=true&w=majority";
(async function connectToDB() {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongoDB");
    app.listen(3000); //Will listen for requests if successfull
  } catch (err) {
    console.log(err);
  }
})();

//register view engine

app.set("view engine", "ejs");

//middleware & static files

app.use(express.static("public")); //<--- allows use of 'public' directory for styles.css
app.use(morgan("dev"));

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
