import {Grocery,User} from "../Model/Model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export const signup = async(req, res) =>{
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({ error: "Fill all fields" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "User already exists" });
    } else {
      const user = new User({ name, email, password });
      await user.save();
      res.status(201).json({ message: "User created successfully" });
    }
  } catch (err) {
    console.log(err);
  }
}

export const login = async(req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: "Fill all fields" });
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      if (!isMatch) {
        res.status(400).json({ error: "Invalid credentials" });
      } else {
        const token = await userLogin.generateAuthToken();
        res.cookie("jwtoken", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 3600000),
        });
        res.status(200).json({ message: "Sign-in success" });
      }
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
}

export const getItems = async(req, res) => {
  try {
    const postMessages = await Grocery.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const logout = async(req, res)=> {
  res.clearCookie("jwtoken", {
    path: "/",
    domain: "https://grocery-mapper-be.onrender.com/api",
  });
  res.status(200).send("User logout");
}

export const  profile=(req, res) =>{
  res.send(req.rootUser);
}

