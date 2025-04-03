const express = require('express');
const sellerRoutes = require('./src/routes/seller.routes');
const connectDB = require('./src/config/db.config');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.SELLER_PORT || 3001;
const productRoutes = require('./src/routes/product.routes')

app.use(express.json());


const corsOptions = {
  origin: '*',
  methods: 'GET, POST, PUT, DELETE, PATCH, HEAD',
  credentials: true,
};
app.use(cors(corsOptions));


app.use('/api/seller', sellerRoutes);
app.use('/api/seller',productRoutes);


connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Seller Service running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
  });