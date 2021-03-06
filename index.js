const jsdom = require("jsdom");
const {JSDOM} = jsdom;

// const {window} = new JSDOM();
const {document} = (new JSDOM('')).window;
const express = require('express');
const path = require("path");
const app = express();

global.document = document;
app.use(express.static("Admin"));
app.use(express.static(path.join("/img", "Admin")));

app.listen(3001);
