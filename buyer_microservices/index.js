const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoutes = require("./src/routes/buyer.routes");
const connectDB = require("./src/config/db.config");
const saveRoutes = require("./src/routes/user.routes");

dotenv.config();
const app = express();

app.use(express.json());
const cors = require("cors");
var corsOptions = {
    origin: "*",  
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true
};
app.use(cors(corsOptions))

connectDB();

app.use("/api", userRoutes);
app.use("/api",saveRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
