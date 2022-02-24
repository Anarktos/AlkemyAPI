import { Router } from 'express'
import { createUser, validateUser } from '../controllers/users.controller.js'
import jsonwebtoken from 'jsonwebtoken';
import Passport from 'passport';
import passport from '../auth/strategy.js'


const usersRouter = Router();


//POST routes
usersRouter.post('/auth/register', async (req, res) => {
    const user = await createUser(req.body);
    if (!user) return res.status(403).json({ message: 'you must provide correct data' });
    return res.json({
        message: 'created',
        user: user.email,
    })
})


usersRouter.post('/auth/login', async (req, res) => {
    const user = await validateUser(req.body.email, req.body.password);
    if (!user) return res.status(403).json({ message: 'you must provide correct data' });
    const payload = {
        username: user.email,
        id: user.id,
    }
    const token = jsonwebtoken.sign(payload, 'secret', { expiresIn: '1800s', })
    return res.json({
        message: 'successful login',
        token,
    })
})


export default usersRouter;