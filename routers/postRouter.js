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

// get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await db.find();
    res.status(200).json(posts);
  } catch (err) {
    res
      .status(500)
      .json({ error: "There was an error while retrieving posts", err });
  }
});

// get post by id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      if (post.length === 0) {
        res.status(404).json({ error: "post by that id cannot be found" });
      } else {
        res.status(200).json(post[0]);
      }
    })
    .catch(err => {
      res.status(500).json({ error: "error retrieving post", err });
    });
});

// delete post by id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(number => {
      if (number) {
        return res
          .status(200)
          .json({ success: `${number} of records deleted` });
      }
      return res
        .status(404)
        .json({ errorMessage: "post with that id not found" });
    })
    .catch(err =>
      res.status(500).json({ errorMessage: "error deleting post" })
    );
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;

  if (!title || !contents) {
    return res
      .status(400)
      .json({ errorMessage: "Please Provide title and contents" });
  }

  db.update(id, { title, contents })
    .then(updated => {
      if (updated) {
        db.findById(id)
          .then(post => res.status(200).json(post))
          .catch(err =>
            res.status(500).json({
              errorMessage:
                "post was updated but there was an error retrieving updated post",
              err
            })
          );
      } else {
        res.status(404).json({ errorMessage: "post with that id not found" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "there was error updating post", err });
    });
});

module.exports = router;
