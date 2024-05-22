const commentService = require("../services/CommentService");

const createComment = async (req, res) => {
  const { userId, content, videoId, parentId = null } = req.body;
  try {
    const response = await commentService.createComment(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getComments = async (req, res) => {
  try {
    const vid = req.params.vid;
    const response = await commentService.getComments(vid);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateComment = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const respone = await commentService.updateComment(id, data);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("id ", id);
    const respone = await commentService.deleteComment(id);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
module.exports = {
  createComment,
  getComments,
  updateComment,
  deleteComment,
};
