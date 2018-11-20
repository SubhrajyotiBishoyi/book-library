import {use} from "passport";
import * as jwt from "passport-jwt";
import {User} from "../entity/Users";
import {getManager} from "typeorm";

let options: any = {};
options.jwtFromRequest = jwt.ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = "b00k$l!br@ry";
use(new jwt.Strategy(options,async function(Payload, done){
    const userRepo = getManager().getRepository(User);
    const user = await userRepo.findOne(Payload.id);
    if(!user) {
        return done(null, false, {message: 'The user does not exist.'});
    }
    return done(null, user);
}));