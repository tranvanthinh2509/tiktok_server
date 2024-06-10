const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword } = newUser;

    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser !== null) {
        resolve({ status: "ERR", message: "The email is already" });
      }
      const hash = bcrypt.hashSync(password, 10);

      const createdUser = await User.create({
        name,
        email,
        password: hash,
        confirmPassword,
      });
      if (createdUser) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createdUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin;

    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser === null) {
        resolve({ status: "ERR", message: "The user is not defined" });
      }
      const comparePassword = bcrypt.compareSync(password, checkUser.password);
      if (!comparePassword) {
        resolve({
          status: "ERR",
          message: "The password or user is incorrect",
        });
      }
      const access_token = await generalAccessToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });
      const refresh_token = await generalRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });
      resolve({
        status: "OK",
        message: "SUCCESS",
        access_token,
        refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: "Ok",
          message: "The user is not defined",
        });
      }

      const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: "Ok",
          message: "The user is not defined",
        });
      }

      await User.findByIdAndDelete(id);

      resolve({
        status: "OK",
        message: "DELETE USER SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await User.find({});

      resolve({
        status: "OK",
        message: "All User",
        data: allUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: id,
      });

      if (user === null) {
        resolve({
          status: "Ok",
          message: "The user is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: user,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const search = (filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (filter) {
        const label = filter[0];
        const allObjectFilter = await User.find({
          $or: [
            { name: { $regex: filter[1], $options: "i" } },
            { nickName: { $regex: filter[1], $options: "i" } },
          ],
        });
        resolve({
          status: "OK",
          message: "Success",
          data: allObjectFilter,
        });
      }

      // resolve({
      //     status: 'OK',
      //     message: 'All User',
      //     data: allUser
      // })
    } catch (e) {
      reject(e);
    }
  });
};

const followUser = (user, currentUser) => {
  return new Promise(async (resolve, reject) => {
    if (currentUser !== user) {
      try {
        const user1 = await User.findById(user);
        const currentUser1 = await User.findById(currentUser);

        if (!user1.followers.includes(currentUser)) {
          await user1.updateOne({ $push: { followers: currentUser } });
          await currentUser1.updateOne({ $push: { followings: user } });
          resolve({
            status: "OK",
            message: "Success",
          });
        } else {
          resolve({
            status: "ERR",
            message: "you allready follow this user",
          });
        }
      } catch (e) {
        reject(e);
      }
    } else {
      resolve({
        status: "ERR",
        message: "you cant follow yourself",
      });
    }
  });
};

const unfollowUser = (user, currentUser) => {
  return new Promise(async (resolve, reject) => {
    if (currentUser !== user) {
      try {
        const user1 = await User.findById(user);
        const currentUser1 = await User.findById(currentUser);

        if (user1.followers.includes(currentUser)) {
          await user1.updateOne({ $pull: { followers: currentUser } });
          await currentUser1.updateOne({ $pull: { followings: user } });
          resolve({
            status: "OK",
            message: "Success",
          });
        } else {
          resolve({
            status: "ERR",
            message: "you dont follow this user",
          });
        }
      } catch (e) {
        reject(e);
      }
    } else {
      resolve({
        status: "ERR",
        message: "you cant follow yourself",
      });
    }
  });
};

const getFollowingUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user1 = await User.findById(userId);

      const followings = await Promise.all(
        user1.followings.map((following) => {
          return User.findById(following);
        })
      );

      let followingsList = [];
      console.log("userIDD ", user1);
      followings.map((following) => {
        const { _id, avatar, name, nickName } = following;
        followingsList.push({ _id, avatar, name, nickName });
      });

      if (user1 === null) {
        resolve({
          status: "OK",
          message: "User is not defined",
        });
      } else {
        resolve({
          status: "OK",
          message: "List following",
          data: followingsList,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getNotFollowingUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user1 = await User.findById(userId);

      const followings = await Promise.all(
        user1.followings.map((following) => {
          return User.findById(following);
        })
      );

      let followingsList = [];
      followings.map((following) => {
        const { _id } = following;
        followingsList.push({ _id });
      });

      let NotFollowingList = await User.find({}, { _id: 1, name: 1 });

      followingsList.map((followingItem) => {
        NotFollowingList = NotFollowingList.filter(
          (NFL) => NFL._id != `${followingItem._id}`
        );
      });
      NotFollowingList = NotFollowingList.filter(
        (NFL) => NFL._id != `${userId}`
      );
      if (user1 === null) {
        resolve({
          status: "OK",
          message: "User is not defined",
        });
      } else {
        resolve({
          status: "OK",
          message: "List not following",
          data: NotFollowingList,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getOneUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: id,
      });

      if (user === null) {
        resolve({
          status: "Ok",
          message: "The user is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: user,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailUser,
  search,
  followUser,
  unfollowUser,
  getFollowingUser,
  getNotFollowingUser,
  getOneUser,
};
