const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    packageSize: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    expirationDate: {
      type: Date,
    },
    brand: {
      type: String,
    },
    category: {
      type: String,
    },
    imageUrl: {
      type: String,
      default: 'https://images.pexels.com/photos/7263016/pexels-photo-7263016.jpeg',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Product', productSchema);
