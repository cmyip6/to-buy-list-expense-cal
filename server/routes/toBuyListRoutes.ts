import express from "express";
import { toBuyListController } from "../app";

export const toBuyListRoutes = () => {
   const toBuyListRoutes = express.Router();

   toBuyListRoutes.get('/', toBuyListController.getToBuyList);
   toBuyListRoutes.post('/', toBuyListController.addNewItem);
   toBuyListRoutes.put('/', toBuyListController.editItem);
   toBuyListRoutes.delete('/', toBuyListController.deleteItem);

   return toBuyListRoutes;
}