/* eslint-disable no-unused-vars */
let express = require("express");
let app = express();
let http = require("http").Server(app);
const path = require("path");

const options = {
  timeZone: "America/Edmonton",
  hour12: true,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
};

let json = JSON.parse(require('./animals.json'));

console.log(json);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/animals", (req, res) => {
  console.log("File requested");
  res.sendFile(__dirname + "/animals.json");
});


app.post("/animals", (req, res) => {
  console.log("File requested");
  res.sendFile(__dirname + "/animals.json");
});


http.listen(3000, () => {
  console.log("Listening on port localhost:3000");
});
