const mongoose = require('mongoose');

const Market = require('../models/Market.model');
const Product = require('../models/Product.model');

import marketsData from './markets.json';
import productsData from './products.json';

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tasteOfHope-server';

async function seeds() {
  try {
    const x = await mongoose.connect(MONGO_URI);
    console.log(`Connected to: ${x.connections[0].name}`);

    const createdMarkets = await Market.create(marketsData);

    console.log(`Successfuly created ${createdMarkets.length} markets`);

    const createdProducts = await Product.create(productsData);

    console.log(`Successfuly created ${createdProducts.length} products`);

    x.disconnect();
  } catch (error) {
    console.log(error);
  }
}

seeds();
