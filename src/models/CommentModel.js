const mongoose = require("mongoose");

const commentModel = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String, required: true },
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    parentId: { type: String },
    liked: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentModel);

module.exports = Comment;
