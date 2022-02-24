import passport from "passport";
import {Strategy, ExtractJwt} from 'passport-jwt';
import Users from "../database/models/users.js";
import dotenv from "../util/dotenv.js";


//Creating the options object to configure the passport strategy
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_OR_KEY,
}


//Creating the strategy to protect endpoints
const jwtStrategy = new Strategy(options, async (payolad, done) => {
    const user = await Users.findByPk(payolad.id);
    if(!user) return done('error', false);
    return done(null, user)
})

passport.use('jwt', jwtStrategy);

export default passport;


