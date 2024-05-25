const Comment = require("../models/CommentModel");

const createComment = (newComment) => {
  return new Promise(async (resolve, reject) => {
    const { userId, content, videoId, parentId = null } = newComment;
    try {
      const newComment = await Comment.create({
        userId,
        content,
        videoId,
        parentId,
      });

      const oke = await newComment.toJSON();
      const data = await Comment.findOne({ _id: oke._id }).populate({
        path: "userId",
        select: ["name", "nickName", "avatar"],
      });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getComments = (vid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const listComment = await Comment.find({
        videoId: vid,
      })
        .sort({ createdAt: -1 })
        .populate({
          path: "userId",
          select: ["name", "nickName", "avatar"],
        });

      resolve({
        status: "OK",
        message: "Success",
        data: listComment,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateComment = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("id ", id);
      console.log("data ", data);
      const update = await Comment.findByIdAndUpdate(id, data, { new: true });

      resolve({
        status: "Ok",
        message: "Success",
        data: update,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteComment = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Comment.findByIdAndDelete(id);
      resolve({
        status: "Ok",
        message: "Delete Success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createComment,
  getComments,
  updateComment,
  deleteComment,
};
