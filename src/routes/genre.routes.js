import { Router } from "express";
import { createGenre, getGenres, updateGenre, deleteGenre } from '../controllers/genre.controller.js';
import Passport from 'passport';
import passport from '../auth/strategy.js';



const genreRouter = Router();


//GET routes
genreRouter.get('/genres', Passport.authenticate('jwt', { session: false }), async (req, res) => {
    const genres = await getGenres();
    return res.json({ genres });
})


//POST routes
genreRouter.post('/genres', Passport.authenticate('jwt', { session: false }), async (req, res) => {
    const genre = await createGenre(req.body);
    if (!genre) return res.status(403).json({ message: 'you must provide correct data' })
    return res.json({ genre });
})

//PUT routes
genreRouter.put('/genres', Passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { name } = req.query;
    const genre = await updateGenre(name, req.body);
    if (!genre) return res.status(403).json({ message: 'you must provide correcta data' });
    return res.json({ genre });
})

//DELETE routes
genreRouter.delete('/genres', Passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { name } = req.query;
    const genre = await deleteGenre(name);
    if (!genre) return res.status(404).json({ message: 'cannot find genre, validate your data and try again' });
    return res.json({ message: 'deleted' });
})



export default genreRouter;