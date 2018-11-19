import * as express from "express";
import * as jwt from "jsonwebtoken";

const router = express.Router();
router.use(require("cookie-parser"));
const SECRET_Key = "b00k$l!br@ry";

export class MiddleWare {
    public router = router.use((req,res,next) => {
        const token = req.headers['x-access-token'] || req.cookies.token;
        if(!token){  
            res.status(403).json({
                message: 'Please Send a Token'
            });
        } 
        else{
            jwt.verify(token, process.env.SECRET_KEY,(error,decoded) => {
                if(error){
                    res.status(401).json({
                        message: 'Token Is Invalid'
                    })
                }
                else{
                    req.decoded = decoded;
                    return next();
                }
            }); 
        }
        return router;
    });
}