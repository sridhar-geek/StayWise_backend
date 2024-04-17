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
  // .cookie("access_token", token, {
  //   maxAge: 3600 * 1000,
  //   httpOnly: true,
  // })
  .status(StatusCodes.OK)
  .json({ userDetails, token });
}
