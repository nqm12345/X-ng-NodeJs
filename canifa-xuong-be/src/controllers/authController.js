import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { sendResetPasswordEmail } from "../utils/sendResetPasswordEmail.js";

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    console.log(`Received password reset request for email: ${email}`);
    
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`User not found with email: ${email}`);
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log(`Generated reset token for user ${user._id}: ${token}`);
    
    await sendResetPasswordEmail(email, token);
    console.log(`Reset password email sent successfully to ${email}`);

    res.status(200).json({ message: "Reset password email sent successfully" });
  } catch (error) {
    console.error("Error during password reset request:", error.message || error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(`Token decoded successfully: ${JSON.stringify(decoded)}`);

    const user = await User.findById(decoded.userId);
    if (!user) {
      console.log(`User not found with ID: ${decoded.userId}`);
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log(`Password hashed successfully for user ${user._id}`);

    user.password = hashedPassword;
    await user.save();
    console.log(`Password updated successfully for user ${user._id}`);

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error during password reset:", error);
    res.status(400).json({ message: "Invalid token or token expired" });
  }
};

export const showProfile = async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findById(req.user._id);
      if (user) {
        console.log(`User profile retrieved successfully for user ${req.user._id}`);
        return res.status(200).json({
          success: true,
          user,
        });
      } else {
        console.log(`User not found with ID: ${req.user._id}`);
        return res.status(404).json({ message: "User not found" });
      }
    } else {
      console.log("User not authenticated");
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    next(error);
  }
};
