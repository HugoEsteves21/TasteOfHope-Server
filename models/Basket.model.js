const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const basketSchema = new Schema(
    {
        basketType: { 
            type: String,
            required: true,
            enum: ['S', 'M', 'L', 'Hope'],
         },
        market: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Market',
            }
        ],
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            }
        ],
        received: {
            type: Boolean,
        },
        price: {
            type: Number,
        },
        giver: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
        receiver: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);


const Basket = model('Basket', basketSchema);

module.exports = Basket;