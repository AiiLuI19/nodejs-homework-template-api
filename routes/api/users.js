const express = require("express");
const router = express.Router();

const {
  signUpUser,
  loginUser,
  logOutUser,
  currentUser,
  updateSubscription,
  addUserAvatar,
  verifyUser,
  verifyUserSecond,
} = require("../../models/users");
const {
  userValidation,
  userValidationSubscript,
  userValidationVerify,
} = require("../../middleware/validateMiddleware");
const { authMiddleware } = require("../../middleware/authMiddleware");
const {
  compressAvatarMiddleware,
} = require("../../middleware/compressAvatarMiddleware");
const { upload } = require("../../helpers/uploadAvatar");

router.post("/signup", userValidation, signUpUser); // Регістрація юзера
router.get("/verify/:verificationToken", verifyUser); // Верификация юзера
router.post("/verify/", userValidationVerify, verifyUserSecond); // Запрос повторной верификации юзера
router.post("/login", userValidation, loginUser); // Логінізація юзера
router.post("/logout", authMiddleware, logOutUser); // Вихід з акаунту
router.post("/current", authMiddleware, currentUser); // який зараз юзер
router.patch(
  "/avatars",
  authMiddleware,
  upload.single("avatar"),
  compressAvatarMiddleware,
  addUserAvatar
);
router.patch("/", authMiddleware, userValidationSubscript, updateSubscription);

module.exports = router;
