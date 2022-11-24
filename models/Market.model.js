const { Schema, model } = require('mongoose');

const marketSchema = new Schema(
  {
    name: {
      type: String,
    },
    adress: {
      type: String,
    },
    brand: {
      type: String,
    },
    description: {
      type: String,
    },
    basket: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Basket',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model('Market', marketSchema);
