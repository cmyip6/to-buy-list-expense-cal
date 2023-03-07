import express from "express";
import { authController } from "../app";

export const authRoutes = () => {
   const authRoutes = express.Router();

   authRoutes.post('/login', authController.login);
   authRoutes.get('/userList', authController.getUserList);

   return authRoutes;
}