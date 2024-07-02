const Video = require("../models/VideoModel");
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");

const createVideo = (newVideo) => {
  return new Promise(async (resolve, reject) => {
    const {
      description,
      video,
      tag,
      imageBg,
      liked,
      comment,
      saved,
      shared,
      userId,
    } = newVideo;
    try {
      const newVideo = await Video.create({
        description,
        video,
        tag,
        imageBg,
        liked,
        comment,
        saved,
        shared,
        userId,
      });

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: newVideo,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateVideo = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkVideo = await Video.findOne({
        _id: id,
      });
      if (checkVideo === null) {
        resolve({
          status: "Ok",
          message: "The video is not defined",
        });
      }

      const updatedVideo = await Video.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedVideo,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailVideo = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const VideoID = await Video.findOne({
        _id: id,
      }).populate({
        path: "userId",
        select: [
          "name",
          "nickName",
          "avatar",
          "followings",
          "followers",
          "creatAt",
        ],
      });

      if (VideoID === null) {
        resolve({
          status: "Ok",
          message: "The Video is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: VideoID,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllVideo = (limit = 3, page = 0, title = "") => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalVideo = await Video.find().count();
      console.log("okok ", title);
      let allVideo;
      if (title === "undefined") {
        allVideo = await Video.find()
          .sort({ createdAt: -1, updatedAt: -1 })
          .limit(limit)
          .skip(page * limit)
          .populate({
            path: "userId",
            select: ["name", "nickName", "avatar", "followings", "followers"],
          });
      } else {
        allVideo = await Video.find({
          $or: [
            { description: { $regex: title, $options: "i" } },
            { tag: { $regex: title, $options: "i" } },
          ],
        })
          .sort({ createdAt: -1, updatedAt: -1 })
          .limit(limit)
          .skip(page * limit)
          .populate({
            path: "userId",
            select: ["name", "nickName", "avatar", "followings", "followers"],
          });
      }

      resolve({
        status: "OK",
        message: "All Video",
        data: allVideo,
        total: totalVideo,
        pageCurrent: page + 1,
        totalPage: Math.ceil(totalVideo / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteVideo = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkVideo = await Video.findOne({
        _id: id,
      });
      if (checkVideo === null) {
        resolve({
          status: "Ok",
          message: "The Video is not defined",
        });
      }

      await Video.findByIdAndDelete(id);

      resolve({
        status: "OK",
        message: "DELETE Video SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const likeVideo = (video, currentUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const video1 = await Video.findById(video);
      // const currentUser1 = await Video.findById(currentUser);

      if (!video1.liked.includes(currentUser)) {
        await video1.updateOne({ $push: { liked: currentUser } });
        resolve({
          status: "OK",
          message: "Success",
        });
      } else {
        await video1.updateOne({ $pull: { liked: currentUser } });
        resolve({
          status: "OK",
          message: "you cancel like",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getRecentVideo = (idList) => {
  return new Promise(async (resolve, reject) => {
    try {
      const followingList = [];
      for (let i = 0; i <= idList.length; i++) {
        const recentVideo = await Video.find({
          userId: idList[i],
        })
          .sort({ createdAt: -1, updatedAt: -1 })
          .populate({
            path: "userId",
            select: [
              "name",
              "nickName",
              "avatar",
              "followings",
              "followers",
              "createdAt",
            ],
          });
        if (recentVideo !== null) {
          followingList.push(...recentVideo);
        }
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: followingList,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getARecentVideo = (idList) => {
  return new Promise(async (resolve, reject) => {
    try {
      const followingList = [];
      for (let i = 0; i < idList.length; i++) {
        const recentVideo = await Video.findOne({
          userId: idList[i],
        })
          .sort({ createdAt: -1, updatedAt: -1 })
          .populate({ path: "userId", select: ["name", "nickName", "avatar"] });
        if (recentVideo !== null) {
          followingList.push(recentVideo);
        }
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: followingList,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getVideoOfMe = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const listVideo = await Video.find({
        userId: id,
      })
        .sort({ createdAt: -1, updatedAt: -1 })
        .populate({ path: "userId", select: ["name", "nickName", "avatar"] });

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: listVideo,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const comment = (id, type, idCmt) => {
  return new Promise(async (resolve, reject) => {
    try {
      const video1 = await Video.findById(id);

      // const currentUser1 = await Video.findById(currentUser);

      if (type === "push") {
        await video1.updateOne({ $push: { comment: idCmt } });
        resolve({
          status: "OK",
          message: "Success",
        });
      }
      if (type === "pull") {
        await video1.updateOne({ $pull: { comment: idCmt } });
        resolve({
          status: "OK",
          message: "you delete Comment",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createVideo,
  updateVideo,
  getDetailVideo,
  getAllVideo,
  deleteVideo,
  likeVideo,
  getRecentVideo,
  getARecentVideo,
  getVideoOfMe,
  comment,
};
