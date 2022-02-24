import dotenv from "../util/dotenv.js"

// console.log(process.env.USER_NAME);

export const DbConfig = {
    database: {
        username: process.env.USER_NAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        host: process.env.HOST,
    }
}