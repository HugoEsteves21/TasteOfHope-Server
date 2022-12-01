const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required."],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required."],
    },
    userType: {
      type: String,
      required: true,
      enum: ['Donor', 'Needful'],
    },
    givenBaskets: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Basket'
      }
    ],
    givenUnits: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Basket'
      }
    ],
    receivedBaskets: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Basket'
      }
    ],
    receivedUnits: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Basket'
      }
    ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;