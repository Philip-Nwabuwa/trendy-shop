import mongoose, { Schema, models } from "mongoose";

const addressSchema = new Schema({
  street: String,
  city: String,
  state: String,
  country: String,
  zipCode: String,
});

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    address: addressSchema,
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
