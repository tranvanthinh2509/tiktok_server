const UserSerVice = require("../services/UserService");
const JwtService = require("../services/JwtService");

const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password, confirmPassword } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!name || !email || !password || !confirmPassword) {
      return res.status(200).json({
        status: "Err",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "Err",
        message: "The input is enmail",
      });
    } else if (password != confirmPassword) {
      return res.status(200).json({
        status: "Err",
        message: "Password is not sane",
      });
    }

    const response = await UserSerVice.createUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!email || !password) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is enmail",
      });
    }

    const response = await UserSerVice.loginUser(req.body);

    const { refresh_token, ...newRespone } = response;
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: false,
      samesite: "strict",
    });

    return res.status(200).json(newRespone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refresh_token;
    if (!token) {
      return res.status(200).json({
        status: "ERR",
        message: "The token is required",
      });
    }
    const response = await JwtService.refreshTokenJwtService(token);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({
      status: "OK",
      message: "Log-out successfully",
    });
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;

    if (!userId) {
      return res.status(200).json({
        status: "Err",
        message: "The userId is required",
      });
    }
    const response = await UserSerVice.updateUser(userId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(200).json({
        status: "Err",
        message: "The userId is required",
      });
    }
    const response = await UserSerVice.deleteUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const response = await UserSerVice.getAllUser();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetailUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "Err",
        message: "The userId is required",
      });
    }
    const response = await UserSerVice.getDetailUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const search = async (req, res) => {
  try {
    const { filter } = req.query;
    const response = await UserSerVice.search(filter);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const followUser = async (req, res) => {
  try {
    const user = req.params.id;
    const currentUser = req.body.userId;
    const response = await UserSerVice.followUser(user, currentUser);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const user = req.params.id;
    const currentUser = req.body.userId;
    const response = await UserSerVice.unfollowUser(user, currentUser);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getFollowingUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await UserSerVice.getFollowingUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getNotFollowingUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await UserSerVice.getNotFollowingUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const getOneUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "Err",
        message: "The userId is required",
      });
    }
    const response = await UserSerVice.getOneUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailUser,
  refreshToken,
  logoutUser,
  search,
  followUser,
  unfollowUser,
  getFollowingUser,
  getNotFollowingUser,
  getOneUser,
};
