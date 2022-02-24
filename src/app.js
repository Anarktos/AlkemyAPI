import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import usersRouter from './routes/users.routes.js'
import moviesRouter from './routes/movies.routes.js';
import characterRouter from './routes/character.routes.js'
import genreRouter from './routes/genre.routes.js';
import * as associations from './database/models/asociations.js'
import Character from './database/models/characters.js';
import Genre from './database/models/genre.js';
import Movie from './database/models/movie.js';
import Users from './database/models/users.js';
import passport from 'passport';
import dotenv from './util/dotenv.js';


//Initializing app
const app = express();


//middlewares 
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(passport.initialize());


//routes
app.use('/', usersRouter);
app.use('/', moviesRouter);
app.use('/', characterRouter);
app.use('/', genreRouter);


export default app;