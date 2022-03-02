const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" })

//Routes
const user = require("./routes/user");
const issue = require("./routes/issue")

let URL = process.env.DATABASE

mongoose.connect(URL, () => ({
    useNewUrlParser: true,
    useFindAndModify: false
}))
    .then(() => console.log('DB Connected'))
    .catch((err) => {
        console.log('connection failed');
    });

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static('uploads'));
app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({     
  extended: false
}));

app.use("/api", issue);
app.use("/api", user);

app.listen(8000, () => {
    console.log("Server is runing on port 8000");
});

app.get("/", (req, res) => {
    res.status(200).send("Welcome to Mern Issue Tracker Application");
});