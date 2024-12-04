require("dotenv").config();
const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password, age } = req.body;

    const hashedpassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedpassword, age });
    await user.save();
    res.status(200).json({ message: "User is registered successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email is already exist" });
    }
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("body", req.body);
    const user = await User.findOne({ email });
    console.log("user", user);
    if (!user) {
      return res.status(400).json({ error: "Invalid Email or Password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log("password", isPasswordValid);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid Email or Password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "4h",
    });
    res.status(200).json({ message: "Login Sucessfull", token });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    return res.status(200).json(
      users.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
      }))
    );
  } catch (error) {
    console.error("Error fetching user details", error);
    res.status(400).json({ error: "Server Error" });
  }
};

const getuserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, age } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { name, email, age },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
      age: user.age,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const deletUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ error: "User not Found" });
    }
    res.status(200).json({ message: "User Deleted sucessfully" });
  } catch (error) {
    console.error("Error deleting user", error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  register,
  login,
  getUser,
  updateUser,
  deletUser,
  getuserById,
};
