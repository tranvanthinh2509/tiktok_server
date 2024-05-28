const UserRouter = require("./UserRouter");
const VideoRouter = require("./VideoRouter");
const CommentRouter = require("./CommentRouter");

const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/video", VideoRouter);
  app.use("/api/comment", CommentRouter);
  app.use("/api/test", async (req, res) => {
    return res.json({
      status: "Ok",
      message: "success",
    });
  });
};

module.exports = routes;
