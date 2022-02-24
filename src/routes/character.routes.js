import express, { Router } from 'express';
import { findAll, createCharacter, findByName, findByAge, findByMovie, findCharactersDetail, updateCharacter, deleteCharacter } from '../controllers/character.controller.js'
import Passport from 'passport';
import passport from '../auth/strategy.js';


const characterRouter = Router();


//GET routes
characterRouter.get('/characters', Passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { name, age, movies } = req.query;

    if (name) {
        const character = await findByName(name);
        return res.json({ character });
    }

    if (age) {
        const characters = await findByAge(age);
        return res.json({ characters });
    }

    if (movies) {
        const characters = await findByMovie(movies);
        return res.json({ characters });
    }

    const characters = await findAll();
    return res.json({ characters });

})

characterRouter.get('/characters/detail', Passport.authenticate('jwt', { session: false }), async (req, res) => {
    const characters = await findCharactersDetail();
    return res.json({ characters });
})


//POST routes
characterRouter.post('/characters', Passport.authenticate('jwt', { session: false }), async (req, res) => {
    const character = await createCharacter(req.body);
    if (!character) return res.status(403).json({ message: 'you must provide correct data' })
    res.json({ character });
})


//PUT routes
characterRouter.put('/characters', Passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { name } = req.query;
    const character = await updateCharacter(name, req.body);
    if (!character) return res.status(403).json({ message: 'you must provide correct data' });
    return res.json({ character });
})


//DELETE routes
characterRouter.delete('/characters', Passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { name } = req.query;
    const character = await deleteCharacter(name);
    if (!character) return res.status(404).json({ message: `cannot delete ${name}` });
    return res.json({ message: 'deleted' });
})




export default characterRouter;