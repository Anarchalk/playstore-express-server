const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const playstore = require("./playstore.js");

const app = express();

app.use(cors());
app.use(morgan("common")); //let us see what is 'common' format looks like

app.get("/apps", (req, res) => {
  let { search = "", sort, genres } = req.query;

  let results = playstore;

  if (genres) {
    //console.log(results)
    genres=genres[0].toUpperCase()+ genres.slice(1).toLowerCase()
    if (
      !["Action", "Puzzle", "Strategy", "Casual", "Arcade", "Card"].includes(
        genres
      )
    ) {
      return res.status(400).send("Value must be one of the genres");
    } else {
      results = results.filter((game) => {
      return game.Genres.toLowerCase().includes(genres.toLowerCase())
      });
    }
  }

  //if search is an empty string is treated as falsy
  if (search) {
    results = results.filter((play) => {
      console.log(play.App);
      return play.App.toLowerCase().includes(search.toLowerCase());
    });
  }

  if (sort) {
    //sort = sort.toLowerCase()
    if (!["app", "rating"].includes(sort.toLowerCase())) {
      return res.status(400).send("put rating or app");
    } else {
      console.log("test");
      results.sort((a, b) => {
        sort = sort[0].toUpperCase() + sort.slice(1);
        console.log(sort);
        //console.log(a[sort])
        // return a[sort] - b[sort]
        //if a is greater than b return number 1 , if a is less than b return negative 1 fdotherwise return 0
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      });
    }
  }

  res.json(results);
});

app.listen(8000, () => {
  console.log("Express is listening on PORT 8000");
});
