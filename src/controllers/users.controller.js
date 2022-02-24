import Users from '../database/models/users.js';
import { encodePassword, comparePasword } from '../util/bcrypt.js'
import { sendEmail } from '../util/sendEmail.js';


//Functions used by POST method in the users router
export async function createUser(body) {
    try {
        const password = await encodePassword(body.password);
        const user = await Users.create({
            email: body.email,
            password: password,
        })
        await sendEmail(user.email);
        return user;
    } catch (error) {
        return false;
    }
}

export async function validateUser(email, pass) {
    try {
        const user = await Users.findOne({ where: { email: email } });
        const password = await comparePasword(pass, user.password);
        return user;

    } catch (error) {
        return false;
    }
}