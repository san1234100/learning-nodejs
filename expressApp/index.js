const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const data = require("../data/data.json");
const fs = require("fs");
const path = require("path");
const { log } = require("console");
const PORT = 4000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("X-HTTP-Method-Override"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);
// app.get('/',(req,res)=>{
//     res.send(JSON.stringify(data))
// })

// get
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/interns", (req, res) => {
  res.send(data);
});


//post
app.post("/addInterns", (req, res) => {
  data.push({
    id: data.length + 1,
    name: req.body.name,
  });
  fs.writeFile("../data/data.json", JSON.stringify(data), (err) => {
    if (err) console.log(err);
    console.log("Data stored successfully");
  });
  res.send(data);
});




//delete
app.delete("/removeIntern", (req, res) => {
  const internID = req.body.id;
  const intern = data.find((intern) => intern.id == internID);
  if (!intern) {
    const error = {
      errorMessage: "Intern Not Found with given id",
      errorCode: "404",
    };
    res.status(404);
    res.json(error);
    return;
  }
  const updatedInterns = data.filter((intern) => intern.id != internID);

  fs.writeFile("../data/data.json", JSON.stringify(updatedInterns), (err) => {
    if (err) console.log(err);
    console.log("Data stored successfully");
  });
  res.status(200);
  res.send(JSON.stringify(updatedInterns));
});



//update
app.put("/modifyIntern", (req, res) => {
  const id = req.body.id;
  const updatedIntern = data.map((intern) => {
    if (intern.id == id) {
      return { ...intern, name: req.body.name };
    }
    return intern;
  });
  fs.writeFile("../data/data.json", JSON.stringify(updatedIntern),(err)=>{
    if(err) console.log(err);
    console.log('File Updated successfully');
  })
  res.json(updatedIntern);
  
});



app.use((req, res) => {
  res.status(404);
  res.send("Page Not Found");
});
app.listen(PORT, () => {
  console.log("listening to port 4000");
});
