const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

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
    app.listen(3000); //Will listen for requests if successful
  } catch (err) {
    console.log(err);
  }
})();

//register view engine

app.set("view engine", "ejs");

//middleware & static files

app.use(express.static("public")); //allows use of 'public' directory for styles.css
app.use(express.urlencoded({ extended: true })); //takes url encoded data and parses to object
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//blog routes
app.use('/blogs', blogRoutes);

//404 page

app.use((req, res) => {
  res.status(404).render("404", { title: "Not Found" });
});
