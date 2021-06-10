const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
    default:
      "https://res.cloudinary.com/dxeac7lyn/image/upload/v1623320666/default-avatar_k0rgwd.png",
  },
});

mongoose.model("User", userSchema);
