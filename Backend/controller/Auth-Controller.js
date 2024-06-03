const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Signup = async (req, res) => {
  try {
    const {
      image,
      User_Name,
      Mobile_No,
      User_Email,
      User_Roleid,
      User_Password,
      User_CreatedDate,
      Status,
    } = req.body;

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ Mobile_No });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate hashed password
    const hashedPassword = await bcrypt.hash(User_Password, 10);

    // Save the user
    const newUser = await UserModel.create({
      image,
      User_Name,
      Mobile_No,
      User_Email,
      User_Roleid,
      User_Password: hashedPassword,
      User_CreatedDate,
      Status,
    });

    // Send response
    res.status(201).json({ message: "User Created Successfully", data: newUser });
  } catch (error) {
    console.error("Error in Signup:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const Login = async (req, res) => {
  const { Mobile_No, User_Password, User_Roleid } = req.body;

  // Check if Role is provided
  if (!User_Roleid) {
    return res.status(400).json({ message: "User_Roleid is required" });
  }

  try {
    const existingUser = await UserModel.findOne({ Mobile_No });

    if (!existingUser) {
      return res.status(404).json({ message: "User Does Not Exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      User_Password,
      existingUser.User_Password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Password incorrect" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d", // Change to a longer duration as needed
      }
    );

    // Do not send hashed password
    delete existingUser.User_Password;

    // Send the token as response along with user data
    return res.status(200).json({ token, user: existingUser });
  } catch (error) {
    console.error("Error in Login:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const Logout = async (req, res) => {
  try {
    // Clear token cookie upon logout
    res.clearCookie("token");
    return res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    console.error("Error in Logout:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const ResetPassword = async (req, res) => {
  const { Mobile_No, User_NewPassword } = req.body;

  try {
    const existingUser = await UserModel.findOne({ Mobile_No });

    if (!existingUser) {
      return res.status(404).json({ message: "User Does Not Exist" });
    }

    // Generate hashed password
    const hashedPassword = await bcrypt.hash(User_NewPassword, 10);

    // Update password
    existingUser.User_Password = hashedPassword;
    await existingUser.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in Reset Password:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserData = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  Signup,
  Login,
  Logout,
  ResetPassword,
  getUserData,
  getUserById
};
