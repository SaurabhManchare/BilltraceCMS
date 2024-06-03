const usertable = require("../models/UserModel");

const GetUser = async (req, res) => {
  try {
    const userId = req.id;
    let user = await usertable.findById(userId).select("-Password");

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  GetUser,
};
