import {use} from "passport";
import {Strategy} from "passport-local";
import {User} from "../entity/Users";
import {getManager} from "typeorm";

use(new Strategy(async function (userName, password, done) {
    const userRepo = getManager().getRepository(User);
    const user = await userRepo.findOne({email: userName});
    if(!user){
        return done(null, false, {message: 'The user does not exist.'});
    }
    return done(null, user);
}));