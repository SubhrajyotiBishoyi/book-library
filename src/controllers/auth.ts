import { User } from "../entity/Users";
import { getManager } from "typeorm";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
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
            photo: req.file.path,
            isAdmin: req.body.isAdmin
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
        if (!req.body.username || !req.body.password) {
            return res.status(400).send({
                success: false,
                message: 'The email and password is required.'
            });
        }
        
        try {
            const user = await userRepository.findOne({ email: req.body.username});
            if(user.password != req.body.password){
                return res.status(400).send({
                    success: false,
                    message: 'The email and password is not correct.'
                });
            }
            const payload = {
                email: req.body.username,
                id: user.id,
            }
            const token = jwt.sign(payload, SECRET_Key, {expiresIn: 100000000});
            return res.status(400).send({
                success: true,
                message: 'Login was successful.',
                token: token,
                id: user.id
            });
        }
        catch(e) {
            console.log(e)
        }
    }

    async updateAuth(req: Request, res: Response){
        const userRepository = getManager().getRepository(User);
                await userRepository.update(req.user.id, {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                phoneNo: req.body.phoneNo,
                photo: req.file.path,
                isAdmin: req.body.isAdmin
            });
            return res.json({
                status: true,
                response: "User Updated successfully!"
            });     
    }
}