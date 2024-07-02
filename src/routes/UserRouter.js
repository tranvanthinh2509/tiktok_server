const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const {
  authMiddleWare,
  authUserMiddleWare,
} = require("../middleware/authMiddleware");

router.post("/sign-up", userController.createUser);
router.post("/sign-in", userController.loginUser);
router.post("/log-out", userController.logoutUser);
router.put("/update-user/:id", authUserMiddleWare, userController.updateUser);
router.delete("/delete-user/:id", authMiddleWare, userController.deleteUser);
router.put("/update-account/:id", authMiddleWare, userController.updateAccount);
router.get("/getAll", authMiddleWare, userController.getAllUser);
router.get("/search", userController.search);
router.get("/get-detail/:id", authUserMiddleWare, userController.getDetailUser);
router.post("/refresh-token", userController.refreshToken);
router.put("/follow/:id", userController.followUser);
router.put("/unfollow/:id", userController.unfollowUser);
router.get("/getFollowing/:id", userController.getFollowingUser);
router.get("/getNotFollowing/:id", userController.getNotFollowingUser);
router.get("/getOneUser/:id", userController.getOneUser);
module.exports = router;
