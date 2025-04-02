const express = require("express");
const app = express();
require("dotenv").config();
const routes = require("./src/routes/routes")
const port = process.env.PORT || 5000;

const connectDB=require('./src/config/db.config');

const cors = require("cors");
var corsOptions = {
    origin: "*",  
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true
};


app.use(cors(corsOptions))


app.use(express.json());
app.use('/api',routes);

connectDB();

app.listen(port,()=>{
    console.log(`PORT is running ${port}`);
})