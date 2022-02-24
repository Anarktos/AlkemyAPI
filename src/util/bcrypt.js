import * as bcrypt from 'bcrypt';
import dotenv from './dotenv.js';

const SALT = 10;


//Function used to encrypt passwords
export async function encodePassword(password) {
    return bcrypt.hash(password, SALT);
}

//Function used to authorize a user by comparing their password
export async function comparePasword(password, hash) {
    return await bcrypt.compare(password, hash);
}