import { User } from "../entity/Users";
import { getManager } from "typeorm";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as cookie from "cookie-parser";
const SECRET_Key = "b00k$l!br@ry";

export class Auth {
    async addUser(req: Request, res: Response) {
        const userRepository = getManager().getRepository(User);
        const user = userRepository.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            phoneNo: req.body.phoneNo,
            photo: req.body.photo
        });
        await userRepository.save(user);
        res.json({
            status: true,
            response: user
        });
    }

    async getUsers(req: Request, res: Response) {
        const userRepository = getManager().getRepository(User);
        const users = await userRepository.find();
        res.json({
            status: true,
            response: users
        });
    }

    async loginUser(req: Request, res: Response) {
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
                email: req.body.email
            }
            const token = jwt.sign(payload, SECRET_Key, {expiresIn: 100000000});
            res.cookie('token', token);
            return res.status(400).send({
                success: true,
                message: 'Login was successful.'
            });
        }
        catch(e) {
            console.log(e)
        }
    }
}
