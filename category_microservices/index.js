const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const categoryRoutes = require('./src/routes/category.routes');
const cors = require('cors');
const connectDB = require('./src/config/db.config');
require('dotenv').config();

const app = express();

const PORT = process.env.CATEGORY_PORT || 1234

app.use(bodyParser.json());

app.use(express.json());

const corsOptions = {
  origin: '*',
  methods: 'GET, POST, PUT, DELETE, PATCH, HEAD',
  credentials: true,
};
app.use(cors(corsOptions));

app.use('/api/category', categoryRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Category Service running on port ${PORT}`);
});