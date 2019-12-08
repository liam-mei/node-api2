const express = require("express");
const db = require("../data/db");

const router = express.Router();


// post comment by postid
router.post('/comments', (req, res) => {

})

// get all comments of post with id
router.get('/comments', (req, res)=> {

})

// get comment with comment id
router.get('/comments/:id', (req, res) => {

})

module.exports = router;
