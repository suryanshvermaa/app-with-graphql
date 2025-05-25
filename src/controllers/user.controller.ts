import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/error";
import User from "../models/user.model";
import response from "../utils/response";
import userAuth from "../auth";

/**
 * @description Create a new user
 * @route POST /api/v1/users
 * @access Public
 * @param req
 * @param res
 * @param next
 */
export const signup = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const {name,password,email}=req.body;
		if(!name || !password || !email) throw new AppError("All fields are required",400);
		const isExist=await User.findOne({email});
		if(isExist) throw new AppError("user already exists",400);
		const user=await User.create({name,email,password});
		await user.save();
		if(!user) throw new AppError("User creation failed",500);
		const authToken=await userAuth.createToken({id:user._id,email:user.email,name:user.name},100);
		response(res,201,"user created sucesssfully",{user,authToken:authToken});
	} catch (err) {
		next(err);
	}
};

/**
 * 
 * @description Login a user
 * @route POST /api/v1/users/login
 * @access Public
 * @param req 
 * @param res 
 * @param next 
 */
export const login=async(req:Request,res:Response,next:NextFunction)=>{
   try {
	   const {email,password}=req.body;
	   if(!email||!password) throw new AppError("All fields are required",400);
	   const user=await User.findOne({email}).select("+password");
	   if(!user) throw new AppError("User not found",404);
	   if(user.password!==password) throw new AppError("Invalid credentials",401);
	   const authToken=await userAuth.createToken({userId:user._id,email:user.email,name:user.name},100);
	   response(res,200,"Login successful",{authToken:authToken});
   } catch (err) {
	   next(err)
   }
}

/**
 * @description Get user profile
 * @route GET /api/v1/users/profile
 * @access Private
 * @param req
 * @param res
 * @param next
 */
export const getUser=async(req:Request,res:Response,next:NextFunction)=>{
   try {
	   const userId=req.userId;
	   const user=await User.findById(userId);
	   response(res,200,"user fetched successfully",{user});
   } catch (err) {
	   next(err)
   }
}

/**
 * @description Get all users
 * @route GET /api/v1/users
 * @access Private
 * @param req
 * @param res
 * @param next
 */
export const getUsers=async(req:Request,res:Response,next:NextFunction)=>{
   try {
	const users=await User.find().limit(10);
	response(res,200,"users fetched successfully",users);
   } catch (err) {
	   next(err)
   }
}
