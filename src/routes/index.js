const UserRouter = require("./UserRouter");
const VideoRouter = require("./VideoRouter");
const CommentRouter = require("./CommentRouter");

const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/video", VideoRouter);
  app.use("/api/comment", CommentRouter);
};

module.exports = routes;
