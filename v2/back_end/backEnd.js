"use strict";

import express from "express";
import fs from "fs";

const app = express();
const PORT = 3000;

import { quotesJackHandey } from "./public/quotes.js";

app.use(express.static("public")); // Haven't told them to do this; TESTing

app.listen(PORT, () => {
  console.log(
    `Your random_quotes server has been started, and is listening on port ${PORT}.`
  );
});
//app.get("/", (request, response) => {
//    response.send(`Your random quotes app is running!!"`);
//})
app.get("/", (request, response) => {
  response.sendFile("./views/index.html", { root: "." });
});
app.get("/about", (request, response) => {
  response.sendFile("./views/about.html", { root: "." });
});
app.get("/404", (request, response) => {
  response.sendFile("./views/404.html", { root: "." });
});

app.get("/randomJS", (request, response) => {
  // From original, FE randomizer
  const randomNumber = Math.floor(Math.random() * quotesJackHandey.length);
  console.log(randomNumber);

  // Test that you can grab an individual quote
  // console.log(`Here's the first quote from the imported quotesJackHandey / quotes.js:`);
  // console.log(quotesJackHandey);
  // console.log(quotesJackHandey[0]);

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

//   // Test that you can grab an individual quote
//   // console.log(`Here's the first quote from quotes.json file:`);
//   // console.log(quotes.quotesJackHandey[0]);

//   // Store the random Quote
//   let randomQuote = quotes.quotesJackHandey[randomNumber];

//   // Return a random Quote
//   response.send(randomQuote);
// });
