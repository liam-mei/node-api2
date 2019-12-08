const express = require("express");
const db = require("../data/db");

const router = express.Router();

// post message from body
router.post("/", (req, res) => {
  const { title, contents } = req.body;
  const post = { title, contents };

  if (!title || !contents)
    return res.status(400).json({
      errorMessage: "Please provide both title and contents for the post"
    });

  db.insert(post)
    .then(obj => {
      db.findById(obj.id).then(post => {
        res.status(201).json(post);
      });
    })
    .catch(err => {
      res.status(500).json({
        error: "post should have saved but there was an error returning it",
        err
      });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "there was an error while saving the post", err });
    });
});



router.put("/:id", (req, res) => {});

module.exports = router;
