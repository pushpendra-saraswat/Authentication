const express = require('express');
const cors = require('cors');
const wiki = require("./Routes/Sign");
// …

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const connection = require('../config/db');

connection();

app.use("/user", wiki);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});




