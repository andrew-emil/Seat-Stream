import express, { Router } from "express";

const register = require("./controllers/register");
const login = require("./controllers/login");

const userRoutes = Router();

//user routes...
userRoutes.post("/register", register);
userRoutes.post("/login", login);

export default userRoutes;