import { AuthService } from "../services/authServices";
import { Request, Response } from "express";

export class AuthController {
    constructor(private authService: AuthService) { }

    login = async (req: Request, res: Response) => {
        try {
            if (!req.body.username) {
                res.status(401).json({ msg: "Wrong Username" });
                return;
            }
            const result = await this.authService.login(req.body.username);
            if (result) {
                res.json({
                    success: true,
                    result,
                    msg: `Hello, ${req.body.username.toUpperCase()}`
                });
            } else {
                res.status(401).json({
                    success: false,
                    msg: "Wrong Username/Password"
                });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ msg: "[LOG] Fail to login." });
        }
    }

    getUserList = async (req: Request, res: Response) => {
        try {
            const result = await this.authService.getUserList()
       
            if (result) {
                res.json({
                    result: result,
                    success: true,
                    msg: 'Get User List Successful'
                });
            } else {
                res.status(401).json({
                    success: false,
                    msg: "Something Went Wrong, Unable to Get User List"
                });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ msg: "[LIST] Fail to get List" });
        }
    }

}