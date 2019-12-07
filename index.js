const express = require("express");

// const db = require("./data/db");


const server = express();
server.use(express.json());


const port = 8080;
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`)
})