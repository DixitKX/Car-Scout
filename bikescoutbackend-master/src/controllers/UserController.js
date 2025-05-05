const userModel=require("../models/UserModel")
const bcrypt = require("bcrypt");
const mailUtil=require("../utils/MailUtil")
const jwt = require("jsonwebtoken");
const secret = "secret";

const loginUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const foundUserFromEmail = await userModel.findOne({ email: email }).populate("roleId");
  console.log("Found User:", foundUserFromEmail);

  if (foundUserFromEmail != null) {
    if (foundUserFromEmail.isBlocked) {
      console.log("User is blocked.");
      return res.status(403).json({
        message: "Your account is blocked. Please contact support.",
      });
    }

    const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);
    console.log("Password match:", isMatch);

    if (isMatch === true) {
      return res.status(200).json({
        message: "login success",
        data: foundUserFromEmail,
      });
    } else {
      return res.status(404).json({
        message: "invalid cred..",
      });
    }
  } else {
    return res.status(404).json({
      message: "Email not found..",
    });
  }
};


const signup = async (req, res) => {
  
  try {
   
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashedPassword;
    const createdUser = await userModel.create(req.body);
    await mailUtil.sendingMail(createdUser.email,"welcome to bikeScout","this is welcome email")
    res.status(201).json({
      message: "user created..",
      data: createdUser,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "error",
      data: err,
    });
  }
};


const getAllUsers = async (req, res) => {
  const Users = await userModel.find();

  res.json({
    message: "user fetched sucessfully...",
    data: Users,
  });
};

const addUser = async (req, res) => {
  const savedUser = await userModel.create(req.body);

  res.json({
    message: "user created sucessfully...",
    data: savedUser,
  });
};

const deleteUser = async (req, res) => {
  const deletedUser = await userModel.findByIdAndDelete(req.params.id);

  res.json({
    message: "User deleted...",
    data: deletedUser,
  });
};

const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user }); // ✅ must be wrapped in { user }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const forgotPassword = async (req, res) => {
  console.log("🔍 Request Body:", req.body); // ✅ Debugging log
  const email = req.body.email;

  if (!email) {
    console.log("❌ Email is missing in request body.");
    return res.status(400).json({ message: "Email is required." });
  }

  const foundUser = await userModel.findOne({ email: email });

  if (!foundUser) {
    console.log("❌ User not found in database.");
    return res.status(404).json({ message: "User not found. Register first." });
  }

  console.log("✅ User found:", foundUser.email);

  const token = jwt.sign({ id: foundUser._id }, secret, { expiresIn: "1h" });
  console.log("✅ Generated Token:", token);

  const url = `http://localhost:5173/resetpassword/${token}`;
  const mailContent = `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          text-align: center;
          padding: 20px;
        }
        .container {
          max-width: 500px;
          background: #ffffff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          margin: auto;
        }
        h2 {
          color: #ff4757;
        }
        p {
          font-size: 16px;
          color: #333;
        }
        .btn {
          display: inline-block;
          padding: 12px 20px;
          font-size: 16px;
          color: #ffffff;
          background: #ff4757;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
        }
        .footer {
          margin-top: 20px;
          font-size: 12px;
          color: #777;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Password Reset Request</h2>
        <p>We received a request to reset your password. Click the button below to reset it:</p>
        <a href="${url}" class="btn">Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
        <div class="footer">
          <p>&copy; 2025 BikeScout. All rights reserved.</p>
        </div>
      </div>
    </body>
  </html>
  `;
  ;

  try {
    await mailUtil.sendingMail(foundUser.email, "Reset Password", mailContent);
    console.log("📩 Reset password email sent to:", foundUser.email);
    return res.json({ message: "Reset password link sent to mail." });
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    return res.status(500).json({ message: "Error sending email." });
  }
};



const resetpassword = async (req, res) => {
  try {
    console.log("🔍 Received reset password request:", req.body);

    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json({ message: "Token and password are required" });
    }

    console.log("🔑 Verifying token:", token);
    const userFromToken = jwt.verify(token, secret);
    console.log("✅ Token decoded:", userFromToken);

    if (!userFromToken.id) {
      console.log("❌ Invalid token: Missing user ID.");
      return res.status(400).json({ message: "Invalid token" });
    }

    // Encrypt new password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    console.log("🔄 Updating password for user:", userFromToken.id);
    const updatedUser = await userModel.findByIdAndUpdate(userFromToken.id, { password: hashedPassword });

    if (!updatedUser) {
      console.log("❌ User not found during password update.");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ Password updated successfully");
    res.json({ message: "Password updated successfully" });

  } catch (error) {
    console.error("❌ Reset password error:", error);
    res.status(500).json({ message: "Invalid or expired token" });
  }
};




module.exports = {
  getAllUsers,
  addUser,
  deleteUser,
  getUserById,
  loginUser,
  signup,
  forgotPassword,
  resetpassword,
};
