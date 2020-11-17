let express = require("express");
let app = express();
let http = require("http").Server(app);
let json = require('./animals.json');
let bodyParser = require('body-parser');

app.use(bodyParser.json());

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

app.delete("/animals/:name", (req, res) => {
  const requestedAnimal = req.params.name;
  console.log("Delete " + requestedAnimal + " requested");
  if(json.animals.map((animal) => animal.name).includes(requestedAnimal)) {
    json.animals.splice(json.animals.findIndex(animal => animal.name === requestedAnimal), 1);
    console.log(requestedAnimal + " deleted");
    res.send(requestedAnimal + " successfully deleted");
  }
  else {
    console.log(requestedAnimal + " could not be deleted");
    res.status(404).send("Could not find " + requestedAnimal);
  }
});

app.post("/animals", (req, res) => {
    let animal = req.body;
    json.animals.push(animal);
    res.send("Successfully created " + animal.name);
    console.log("Successfully created " + animal.name);
});

app.patch("/animals", (req, res) => {
    let requestedAnimal = req.body;
    let animalToReplace = json.animals.filter((animal) => animal.name === requestedAnimal.name)[0];
    if(animalToReplace !== null) {
      animalToReplace.image = requestedAnimal.image;
      res.send("Successfully updated " + requestedAnimal.name + " image");
      console.log("Successfully update " + requestedAnimal.name + " image");
    } else {
      console.log(requestedAnimal + " could not be updated");
      res.status(404).send("Could not find " + requestedAnimal);
    }
});


http.listen(3000, () => {
  console.log("Listening on port localhost:3000");
});
