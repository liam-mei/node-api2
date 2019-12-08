const express = require("express");
const postRouter = require('./routers/postRouter')

const server = express();
server.use(express.json());
server.use('/api/posts', postRouter);


const port = 8080;
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`)
})