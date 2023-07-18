import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: [true, "Email already exists"],
  },
  image: {
    type: String,
  },
  password: {
    type: String,
    minLength: 6,
  },
});

// need this for hot module replacement, to prevent redefining models
const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
