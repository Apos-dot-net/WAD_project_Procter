const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const {window} = new JSDOM();
const {document} = (new JSDOM('')).window;
const express = require('express');
const app = express();

global.document = document;
app.use(express.static("admin"))
app.use('/Admin/img', express.static('images'))

const $ = jQuery = require('jquery')(window);

app.listen(3001)

