import app from "./app.js";
import dotenv from "./util/dotenv.js";
import { sequelize } from './database/db.js';



const main = () => {
    app.listen(process.env.PORT, async () => {
        await sequelize.sync({ force: false }, ex => {
            if (ex) console.log(ex);
        })
        console.log(`app running on port ${process.env.PORT}`);
    })
}

main();


