const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// get route for home page, gets the 10 most recently added movies
router.get("/", (req, res) => {
  const query = `
    SELECT * FROM "movies"
      ORDER BY "id" DESC
      LIMIT 10;
  `;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all movies", err);
      res.sendStatus(500);
    });
});
// get route for description page, gets the info of the specific movie clicked
router.get("/:id", (req, res) => {
  const query = `
    SELECT * FROM "movies"
    WHERE "id" = $1;
  `;
  const sqlValues = req.params.id;
  pool
    .query(query, [sqlValues])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all movies", err);
      res.sendStatus(500);
    });
});
// get route to get the genres of a selected movie for display
router.get("/genres/:id", (req, res) => {
  const query = `
    SELECT
      "genres"."name"
    FROM "genres"
	    JOIN "movies_genres"
	      ON "genres"."id" = "movies_genres"."genre_id"
	    JOIN "movies"
	      ON "movies_genres"."movie_id" = "movies"."id"
    WHERE "movies"."id" = $1;
  `;
  const sqlValues = req.params.id;
  pool
    .query(query, [sqlValues])
    .then((result) => {
      res.send(result.rows);
      console.log("this is result.rows", result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all movies", err);
      res.sendStatus(500);
    });
});
// get route for search bar, gets movies from database that have been id'd with the correspoding selected genre
router.get("/search/genres/:id", (req, res) => {
  const query = `
    SELECT 
    "movies"."id",
    "movies"."title",
    "movies"."poster",
    "movies"."description"
    FROM "movies"
	    JOIN "movies_genres"
	      ON "movies"."id" = "movies_genres"."movie_id"
	    JOIN "genres"
	      ON "movies_genres"."genre_id" = "genres"."id"
    WHERE "genres"."id" = $1;
  `;
  const sqlValues = req.params.id;
  pool
    .query(query, [sqlValues])
    .then((result) => {
      res.send(result.rows);
      console.log("this is result.rows for genre search", result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all movies", err);
      res.sendStatus(500);
    });
});
// get route for search bar, gets movies from database whose title match the query
router.get("/search/:id", (req, res) => {
  console.log("req.params maybe?", req.params.id);
  const query = `
    SELECT * FROM "movies" 
      WHERE "title" ILIKE $1;
  `;
  const sqlParams = req.params.id;
  pool
    .query(query, [`%${sqlParams}%`])
    .then((result) => {
      res.send(result.rows);
      console.log("this the res rows", result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all movies", err);
      res.sendStatus(500);
    });
});
// post route to add a new movie, modified to add multiple genres when adding a movie by sending
// an array of genre_id's, looping through them and performing the genre SQL quest for each item
router.post("/", (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
    INSERT INTO "movies" 
      ("title", "poster", "description")
      VALUES
      ($1, $2, $3)
      RETURNING "id";
  `;
  const insertMovieValues = [
    req.body.title,
    req.body.poster,
    req.body.description,
  ];
  // FIRST QUERY MAKES MOVIE
  pool
    .query(insertMovieQuery, insertMovieValues)
    .then((result) => {
      // ID IS HERE!
      console.log("New Movie Id:", result.rows[0].id);
      const createdMovieId = result.rows[0].id;
      for (let genreId of req.body.genre_id) {
        // Now handle the genre reference:
        const insertMovieGenreQuery = `
        INSERT INTO "movies_genres" 
          ("movie_id", "genre_id")
          VALUES
          ($1, $2);
      `;
        const insertMovieGenreValues = [createdMovieId, genreId];
        // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
        pool
          .query(insertMovieGenreQuery, insertMovieGenreValues)
          .then((result) => {
            //Now that both are done, send back success!
          })
          .catch((err) => {
            // catch for second query
            console.log(err);
            res.sendStatus(500);
          });
      }
      res.sendStatus(201);
    })
    .catch((err) => {
      // 👈 Catch for first query
      console.log(err);
      res.sendStatus(500);
    });
});
// put route for editing the information in a selected movie
router.put("/:id", (req, res) => {
  const sqlText = `
  UPDATE "movies"
  SET ("title", "description") = ($1, $2)
  WHERE "id" = $3`;
  const sqlValues = [req.body.title, req.body.description, req.params.id];
  pool
    .query(sqlText, sqlValues)
    .then((result) => {
      res.send(result.rows);
      console.log("this is result.rows", result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all movies", err);
      res.sendStatus(500);
    });
});

module.exports = router;
