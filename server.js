const { request, response } = require("express");
const express = require("express");

const server = express();
const port = process.env.PORT || 3000;
const theAnswer = "pasta";
server.get("/hello/:word", (request, response) => {
  const userWord = request.params.word;
  let answer = [];
  for (let i = 0; i < userWord.length; i++) {
    const ch = userWord[i];
    if (ch == theAnswer[i]) {
      answer.push(1);
    } else if (theAnswer.includes(ch)) {
      answer.push(0);
    } else {
      answer.push(-1);
    }
  }
  response.json(answer);
});

server.use(express.static("public"));

server.get("/show", (request, response) => {
  response.send("<h1>Hello loop</h1>");
});

server.listen(port, () => {
  console.log("server is running on port 3000");
});
