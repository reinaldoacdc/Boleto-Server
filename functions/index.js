const functions = require("firebase-functions");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const routeboleto = require("./routes/routeboleto");
const routeuser = require("./routes/routeuser")

const app = express();

app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routeboleto);
app.use(routeuser);

app.use((req, res) => {
  res.status(404).send("endpoint not found");
});

exports.App = functions.https.onRequest(app);
