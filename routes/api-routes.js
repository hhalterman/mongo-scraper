// Requiring our models
var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

// Routes
// =============================================================
module.exports = function(app) {
  //hi
  // A GET route for scraping the echoJS website
app.get("/scrape", function(req, res) {
  console.log("scrape it now")
  // First, we grab the body of the html with axios
  axios.get("https://www.npr.org/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    $("h3.title").each(function(i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(element).text();
      result.summary = $(element).parent().next().find('p').text();
      result.link = $(element).parent().attr('href');
      console.log(result)

      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
    });

    // Send a message to the client
    res.send("Scrape Complete");
  });
});



app.delete("/delete", function(req, res) {
  // Route for getting all Articles from the db
  console.log("delete it all now")
    // Grab every document in the Articles collection
    db.Article.deleteMany({})
      .then(function(dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        // res.json(dbArticle);
        // console.log(dbArticle[0].link)
         res.render("index");
        console.log(dbArticle)
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
    });



    app.put("/save/:id", function(req, res) {
      // Route for getting all Articles from the db
      console.log("save it now")
      console.log(req.params.id)
        // Grab every document in the Articles collection
        // db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id });
        db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: true })
          .then(function(dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
            // res.json(dbArticle);
            // console.log(dbArticle[0].link)
             res.render("index");
            console.log(dbArticle)
          })
          .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
          });
        });

        app.put("/remove/:id", function(req, res) {
          // Route for getting all Articles from the db
          console.log("remove it now")
          console.log(req.params.id)
            // Grab every document in the Articles collection
            // db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id });
            db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: false })
              .then(function(dbArticle) {
                // If we were able to successfully find Articles, send them back to the client
                // res.json(dbArticle);
                // console.log(dbArticle[0].link)
                 res.render("index");
                console.log(dbArticle)
              })
              .catch(function(err) {
                // If an error occurred, send it to the client
                res.json(err);
              });
            });

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.Article.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("note")
    .then(function(dbArticle) {
      // If we were able to successfully find an Article with the given id, send it back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function(req, res) {
  // Create a new note and pass the req.body to the entry
  db.Note.create(req.body)
    .then(function(dbNote) {
      // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbArticle) {
      // If we were able to successfully update an Article, send it back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

};