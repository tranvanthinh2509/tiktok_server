const express = require("express");
const router = express.Router();
const commentController = require("../controllers/CommentController");

router.post("/create", commentController.createComment);
router.get("/getComments/:vid", commentController.getComments);
router.put("/updateComment/:id", commentController.updateComment);
router.delete("/deleteComment/:id", commentController.deleteComment);

module.exports = router;
