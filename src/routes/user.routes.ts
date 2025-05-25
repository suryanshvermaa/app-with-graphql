import { Router } from "express";
import {getUser, getUsers, login, signup } from "../controllers/user.controller";
import userAuth from "../auth";
const userRouter = Router();

userRouter
.post("/signup", signup)
.post("/login",login)
.get("/profile",userAuth.auth,getUser)
.get("/users",userAuth.auth,getUsers)

export default userRouter;
