import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  picture: String,
  name: String,
  email: String,
  watchlist: [{}],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);

export default User;
