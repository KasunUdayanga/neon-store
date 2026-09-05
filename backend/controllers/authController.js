const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET , {
    expiresIn: "7d",
  });
};

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide name, email, and password." });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists." });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    if (!user.password) {
      return res.status(401).json({
        message: "This account uses Clerk sign-in. Please continue with Clerk.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

const getMe = (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
};

const syncClerkUser = async (req, res, next) => {
  try {
    const {
      clerkUserId,
      email,
      name,
      imageUrl = "",
      provider = "clerk",
    } = req.body;

    if (!clerkUserId) {
      return res.status(400).json({ message: "Clerk user ID is required." });
    }

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const resolvedName = String(
      name || normalizedEmail.split("@")[0] || "Customer"
    ).trim();

    let user = await User.findOne({
      $or: [{ clerkUserId }, { email: normalizedEmail }],
    });

    if (user) {
      user.clerkUserId = clerkUserId;
      user.email = normalizedEmail;
      user.name = resolvedName;
      user.imageUrl = String(imageUrl || "");
      user.provider = provider;
      user.role = user.role || "customer";
      await user.save();
    } else {
      user = await User.create({
        clerkUserId,
        name: resolvedName,
        email: normalizedEmail,
        imageUrl: String(imageUrl || ""),
        provider,
        role: "customer",
      });
    }

    res.status(200).json({
      message: "Clerk user synced successfully.",
      user: {
        _id: user._id,
        clerkUserId: user.clerkUserId,
        name: user.name,
        email: user.email,
        imageUrl: user.imageUrl,
        provider: user.provider,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser, getMe, syncClerkUser };
