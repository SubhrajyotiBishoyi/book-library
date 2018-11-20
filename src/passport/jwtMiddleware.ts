import * as express from "express";
import {authenticate} from "passport";

export default (req, res, next) => {
    authenticate('jwt', {session: false}, function(err, user, info){
        if(err) {
            return next(err);
        }
        if(!user) {
            return res.json({
                status: false,
                response: info.message
            })
        }
        req.user = user;
        return next();
    })(req, res, next);
}