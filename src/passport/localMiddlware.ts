import {authenticate} from "passport";
import * as express from "express";

export default (req, res, next) => {
    authenticate('local', function(err, user, info) {
        if(err) {
            return next(err);
        }
        if(!user) {
            return res.json({
                status: false,
                message: info.message
            })
        }
        req.user = user;
        return next();
    })(req, res, next);
}
