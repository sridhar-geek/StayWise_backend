import { StatusCodes } from "http-status-codes";
import NotFoundError from "../errors/not-found.js";
import BadRequestError from '../errors/bad-request.js'

import {User} from '../Model/Users.js'

// Register user
export const registerUser = async(req,res) => {
    const user = User.create(req.body)
    res.status(StatusCodes.CREATED).json('Registration Successful')
}

// Login user
export const loginUser = async (req,res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user) throw new NotFoundError('Email not registered')
    const isPassword = await user.comparePassword(password)
    if(!isPassword) throw new BadRequestError('Invalid Credentails')
    const token = await user.createToken();
const {password: userPassword, ...userDetails} = user._doc
res
  .cookie("access_token", token, {
    maxAge: 3600 * 1000,
    httpOnly: true,
      path: "/",
      sameSite: process.env.ENVIRONMENT === "production" ? "None" : "strict", // 'None' for production, 'Lax' for development
      secure: process.env.ENVIRONMENT === "production", // true for production, false for development
  })
  .status(StatusCodes.OK)
  .json({ userDetails });
}
