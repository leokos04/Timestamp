var express = require("express");
var app = express();

var cors = require("cors");

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api", (req, res) => {
  res.json({ unix: Date.now(), utc: new Date().toUTCString() });
});

app.get("/api/:date", (req, res) => {
  const date = req.params.date;
  console.log(date);
  let unix, utc;

  if (new Date(parseInt(date)).toString() == "Invalid Date") {
    res.json({ error: "Invalid Date" });
    return;
  }

  if (
    !/-/g.test(date) &&
    !/\s/g.test(date) &&
    new Date(parseInt(date)).getTime() === parseInt(date)
  ) {
    unix = parseInt(date);
    utc = new Date(parseInt(date)).toUTCString();
  } else {
    unix = new Date(date).getTime();
    utc = new Date(parseInt(unix)).toUTCString();
  }
  res.json({ unix: unix, utc: utc });
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
