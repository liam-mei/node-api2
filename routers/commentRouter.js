const express = require("express");
const db = require("../data/db");

const router = express.Router({
  mergeParams: true
});

// post comment by postid
router.post("/comments", (req, res) => {
  const { post_id, text } = req.body;

  if (!req.body.text)
    return res.status(400).json({ error: "please provide text for comment" });

  db.insertComment({ post_id, text })
    .then(obj => {
      db.findCommentById(obj.id)
        .then(comment => res.status(200).json(comment))
        .catch(error =>
          res.status(500).json({
            error:
              "comment should have saved but there was problem returning it"
          })
        );
    })
    .catch(() =>
      res.status(404).json({ error: "post with that id not found" })
    );
});


module.exports = router;
