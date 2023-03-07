import { Request, Response } from "express";
import { ToBuyListService } from "../services/toBuyListServices";

export class ToBuyListController {
    constructor(private toBuyListService: ToBuyListService) { }

    addNewItem = async (req: Request, res: Response) => {
        try {
            const itemName = req.body.itemName
            const quantity = req.body.quantity
            const remarks = req.body.remarks
            const item = await this.toBuyListService.addNewItem(itemName, quantity, remarks)

            if (item) {
                res.json({
                    success: true,
                    item,
                    msg: `New Item Added`
                });
            } else {
                res.status(401).json({
                    success: false,
                    msg: "Cannot Added New Item, Something Wrong with the DB"
                });
            }

        } catch (e) {
            console.error(e);
            res.status(500).json({ msg: "[ITEM] Fail to Add New Item." });
        }
    }

    editItem = async (req: Request, res: Response) => {
        try {
            const item = await this.toBuyListService.editItem(req.body.id, req.body.itemName, req.body.quantity, req.body.remarks, req.body.handler, req.body.state)

            if (item) {
                res.json({
                    success: true,
                    item,
                    msg: `Item Edited`
                });
            } else {
                res.status(401).json({
                    success: false,
                    msg: "Cannot Edit Item, Something Wrong with the DB"
                });
            }

        } catch (e) {
            console.error(e);
            res.status(500).json({ msg: "[ITEM] Fail to Edit Item." });
        }
    }

    deleteItem = async (req: Request, res: Response) => {
        try {
            await this.toBuyListService.deleteItem(req.body.id)

            res.json({
                success: true,
                msg: `Item Deleted`
            });

        } catch (e) {
            console.error(e);
            res.status(500).json({ msg: "[ITEM] Fail to Edit Item." });
        }
    }

    getToBuyList = async (req: Request, res: Response) => {
        try {
            const result = await this.toBuyListService.getToBuyList()

            if (result) {
                res.json({
                    success: true,
                    toBuyList: result,
                    msg: `To Buy List Retrieved`
                });
            } else {
                res.status(401).json({
                    success: false,
                    msg: "Cannot Get To Buy List, Something Wrong with the DB"
                });
            }

        } catch (e) {
            console.error(e);
            res.status(500).json({ msg: "[ITEM] Fail to Get List." });
        }
    }

}