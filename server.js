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

let json = require('./animals.json');
let largestId = json.animals.map((animal) => animal.id).reduce((max, curr) => curr > max ? curr : max);
console.log(largestId)


app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/animals", (req, res) => {
  console.log("All animals requested");
  res.send(json.animals);
});

app.get("/animals/:name", (req, res) => {
  const requestedAnimal = req.params.name;
  console.log(requestedAnimal + " requested");
  if(json.animals.map((animal) => animal.name).includes(requestedAnimal)) {
    console.log(requestedAnimal + " sent");
    res.send(json.animals.filter(animal => animal.name === requestedAnimal));
  }
  else {
    res.status(404).send("Could not find requested animal");
  }
  
});

app.post("/animals", (req, res) => {
  console.log("File requested");
  res.sendFile(__dirname + "/animals.json");
});


http.listen(3000, () => {
  console.log("Listening on port localhost:3000");
});
