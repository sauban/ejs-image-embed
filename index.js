const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));

//route for index page
app.get("/", function (req, res) {
  return res.json({
    hello: 'World'
  });
});

//route for magic page
app.post("/render", function (req, res) {
    const { base64 } = req.body;
    ejs.renderFile('./views/ejs-template.ejs', {imageBase64: base64}, function(err, html) {
        if (err) return res.status(500).send(err);
        return res.status(200).send(html);
    });
});

app.listen(1337, function () {
  console.log("Server is running on port 1337 ");
});
