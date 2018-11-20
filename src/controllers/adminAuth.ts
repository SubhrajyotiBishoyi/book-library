import { User } from "../entity/Users";
import { getManager } from "typeorm";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as cookie from "cookie-parser";
const SECRET_Key = "b00k$l!br@ry";

export class AdminAuth {
    async adminLogin(req: Request, res: Response) {
        const userRepository = getManager().getRepository(User);
        if (!req.body.email || !req.body.password) {
            return res.status(400).send({
                success: false,
                message: 'The email and password is required.'
            });
        }
        
        try {
            const user = await userRepository.findOne({ email: req.body.email});
            const password = await userRepository.findOne({ password: req.body.password});
            if(!user) {
                return res.status(400).send({
                    success: false,
                    message: 'The user does not exist.'
                });
            }
            if(!password){
                return res.status(400).send({
                    success: false,
                    message: 'The email and password is not correct.'
                });
            }
            const payload = {
                email: req.body.email,
                isAdmin: []
            }
            const token = jwt.sign(payload, SECRET_Key, {expiresIn: 100000000});
            res.cookie('token', token);
            return res.status(400).send({
                success: true,
                message: 'Login was successful as Admin.'
            });
        }
        catch(e) {
            console.log(e)
        }
    }
}
