import express from "express"
import Authenticate from "../middleware/Authenticate.js";
import {  signup,  login,  getItems,  logout,  profile,} from "../Controller/Controller.js"

const router = express.Router();

router.get("/", async (req, res) => {
  res.send(`Hello backend from router`);
});

router.post("/signup", signup);

router.post("/login", login);

router.get("/getItems", getItems);

router.get("/logout", logout);

router.get("/profile", Authenticate, profile);

export default router