const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUser,
  updateUser,
  deletUser,
  getuserById,
} = require("../Controllers/UserController");

router.post("/register", register);
router.post("/login", login);
router.get("/getuser", getUser);
router.get("/getuserById/:id", getuserById);
router.put("/updateuser/:id", updateUser);
router.delete("/deleteuser/:id", deletUser);

module.exports = router;
