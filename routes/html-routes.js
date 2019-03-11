var db = require("../models");
var axios = require("axios");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
// Route for getting all Articles from the db

  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      // res.json(dbArticle);
      // console.log(dbArticle[0].link)
       res.render("index", {data: dbArticle});
       console.log(dbArticle)
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });

});


app.get("/saved", function(req, res) {
  // Route for getting all Articles from the db
  console.log('go to saved articles');
    // Grab every document in the Articles collection
    db.Article.find({})
      .then(function(dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        // res.json(dbArticle);
        // console.log(dbArticle[0].link)
         res.render("saved", {data: dbArticle});
         console.log(dbArticle)
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  
  });


  // app.get("/", function(req, res) {
  //   db.Beer.findAll({}).then(function(dbBeers) {
  //     // res.json(dbBeers);
  //     res.render("index", {
  //       //msg: "Welcome!",
  //       beers: dbBeers
  //     });
  //   });
  // });

  // app.get("/stage0/:id", function(req, res) {
  //   db.Beer.findAll({}).then(function(dbBeers) {
  //     // res.json(dbBeers);
  //     res.render("stage0", {
  //       beers: dbBeers
  //     });
  //   });
  // });

  // app.get("/stage0", function(req, res) {
  //   db.Beer.findAll({}).then(function(dbBeers) {
  //     res.render("stage0", {
  //       beers: dbBeers
  //     });
  //   });
  // });

  // app.get("/stage1/:id", function(req, res) {
  //   db.Beer.findOne({ where: { id: req.params.id } }).then(function(dbBeers) {
  //     res.render("stage1", {
  //       beers: dbBeers
  //     });
  //   });
  // });

  // app.get("/stage2/:id", function(req, res) {
  //   db.Beer.findOne({ where: { id: req.params.id } }).then(function(dbBeers) {
  //     res.render("stage2", {
  //       beers: dbBeers
  //     });
  //   });
  // });

  // app.get("/stage3/:id", function(req, res) {
  //   db.Beer.findOne({ where: { id: req.params.id } }).then(function(dbBeers) {
  //     res.render("stage3", {
  //       beers: dbBeers
  //     });
  //   });
  // });

  // app.get("/stage4/:id", function(req, res) {
  //   db.Beer.findOne({ where: { id: req.params.id } }).then(function(dbBeers) {
  //     res.render("stage4", {
  //       beers: dbBeers
  //     });
  //   });
  // });

  // // Load beer page and pass in an beer by id
  // app.get("/beer/:id", function(req, res) {
  //   db.Beer.findOne({ where: { id: req.params.id } }).then(function(dbBeer) {
  //     res.render("beer", {
  //       beer: dbBeer
  //     });
  //   });
  // });

  // // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });
};