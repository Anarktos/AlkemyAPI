import express, { Router } from 'express';
import { getMovies, getMoviesDetail, getMovieByName, createMovie, getByGenre, getMoviesOrder, updateMovie, deleteMovie } from '../controllers/movie.controller.js';
import Passport from 'passport';
import passport from '../auth/strategy.js'

const moviesRouter = Router();



//GET routes
moviesRouter.get('/movies', Passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { name, genre, order } = req.query;
    if (name) {
        const movie = await getMovieByName(name);
        return res.json({ movie });
    }
    if (genre) {
        const movies = await getByGenre(genre);
        return res.json({ movies });
    }
    if (order) {
        const movies = await getMoviesOrder(order);
        return res.json({ movies });
    }

    const movies = await getMovies();
    return res.json({ movies });

})

moviesRouter.get('/movies/detail', Passport.authenticate('jwt', { session: false }), async (req, res) => {
    const movies = await getMoviesDetail();
    return res.json({ movies });
})



//POST routes
moviesRouter.post('/movies', Passport.authenticate('jwt', { session: false }), async (req, res) => {
    const movie = await createMovie(req.body);
    if (!movie) return res.status(403).json({ message: 'you must provide correcta data' });
    return res.json({ movie });
})


//PUT routes
moviesRouter.put('/movies', Passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { name } = req.query;
    const movie = await updateMovie(name, req.body);
    if (!movie) return res.status(403).json({ message: 'you must provide correct data' });
    return res.json({ movie });
})


//DELETE routes
moviesRouter.delete('/movies', Passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { name } = req.query;
    const movie = await deleteMovie(name);
    if (!movie) return res.status(404).json({ message: `cannot delete ${name}` });
    return res.status(200).json({ message: 'deleted' });
})







export default moviesRouter;