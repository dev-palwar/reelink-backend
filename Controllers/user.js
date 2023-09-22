const User = require("../Model/users.js");
const sendResponse = require("../Utils/functions.js");

const logout = async (req, res) => {
  req.logOut(() => res.status(200).json({ message: "User logged out" }));
};

const throwError = (req, res) => {
  sendResponse(res, "Internal server error");
};

const getUser = async (req, res) => {
  try {
    const resFromDB = await User.findOne({ email: req.user.email });
    sendResponse(res, false, "", resFromDB);
  } catch (error) {
    sendResponse(res, true, error.message);
  }
};

const addToWatchlist = async (req, res) => {
  if (req.user) {
    const dataToAdd = req.body;
    try {
      const user = await User.findOne({ email: req.user.email });

      const alreadyThere = user.watchlist.some(
        (value) => value.id === dataToAdd.id
      );

      if (alreadyThere) {
        await User.updateOne(
          { email: req.user.email },
          { $pull: { watchlist: { id: dataToAdd.id } } }
        );
        sendResponse(res, false, "Removed from watchlist", user, false);
      } else {
        await User.updateOne(
          { email: req.user.email },
          { $push: { watchlist: dataToAdd } }
        );
        sendResponse(res, false, "Added to watchlist", user, true);
      }
    } catch (error) {
      sendResponse(res, true, error.message);
    }
  }
};

module.exports = { logout, getUser, throwError, addToWatchlist };
