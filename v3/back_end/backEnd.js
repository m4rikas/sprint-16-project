"use strict";

// -- Imports & Constants --
import express from "express";
import fs from "fs";
import { quotesJackHandey } from "./public/quotes.js";
import mongoose from "mongoose";
import { Quote } from "./models/quote.js";

const app = express();
const PORT = 3050;

// MongoDB Atlas "connection string"
const dbURI =
  "mongodb+srv://testUser1984:student1234@sou7hernsaintmongodb.7x7o7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// -- Middleware ---

// Register view engine
app.set("view engine", "ejs");

// Establish "public" assets folder
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Mongoose connection to MongoDB Atlas
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000), console.log("connected to DB"))
  .catch((err) => console.log(err));

// Router
app.listen(PORT, () => {
  console.log(
    `Your random_quotes server has been started, and is listening on port ${PORT}.`
  );
});

// Quotes "Index" handler
app.get("/", (request, response) => {
  // const quotes = [
  //     {author: 'Jack Handey', snippet: 'On time-travel ...'},
  //     {author: 'Jack Handey', snippet: 'On poor people ...'},
  //     {author: 'Jack Handey', snippet: 'On de-forrestation ...'}
  // ]
  // response.render('index.ejs', {quotes: quotes})
  response.redirect("/quotes");
});

// Quotes "About" handler
app.get("/about", (request, response) => {
  response.render("about.ejs");
});

// Quotes "Create" Form (for new blog) handler
app.get("/quotes/create", (req, res) => {
  res.render("create");
});

// Quotes "Create" Action
app.post("/quotes", (req, res) => {
  console.log(req.body);
  const newQuote = new Quote(req.body);
  newQuote
    .save()
    .then((result) => {
      // res.send(result)
      res.redirect("/quotes");
    })
    .catch((err) => {
      console.log(err);
    });
});

// Quotes INDEX action
app.get("/quotes", (req, res) => {
  Quote.find().then((result) => {
    res.render("index", { quotes: result });
  });
});

// Quotes SHOW action
app.get("/quotes/:id", (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  Quote.findById(id).then((result) => {
    console.log(result);
    res.render("details", { quote: result });
  });
});

app.delete("/quotes/:id", (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  Quote.findByIdAndDelete(id).then((result) => {
    console.log(result);
    res.json({ redirect: "/quotes" });
  });
});

// "Random JS" handler
app.get("/randomJS", (request, response) => {
  // From original, FE randomizer
  const randomNumber = Math.floor(Math.random() * quotesJackHandey.length);
  console.log(randomNumber);

  // Store the generated Quote
  let randomQuote = quotesJackHandey[randomNumber];

  // Return the Quote
  response.send(randomQuote);
});

// "random JSON" handler (Not used in assignment; for DEV purposes only)
// app.get("/randomJSON", (request, response) => {
//   const quotes = JSON.parse(
//     fs.readFileSync("./public/quotes.json", (err, data) => {
//       if (err) {
//         console.log(err);
//       }
//       return data.toString();
//     })
//   );

//   // From original, FE randomizer
//   const randomNumber = Math.floor(
//     Math.random() * quotes.quotesJackHandey.length
//   );
//   console.log(randomNumber);

//   // Store the random Quote
//   let randomQuote = quotes.quotesJackHandey[randomNumber];

//   // Return a random Quote
//   response.send(randomQuote);
// });

// "404" Handler
app.use((req, res) => {
  res.status(404).render("404.ejs");
});
