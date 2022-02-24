import character from './characters.js';
import movie from './movie.js';
import genre from './genre.js';


// movies associated to genre
genre.hasMany(movie);
movie.belongsTo(genre);


// characters - movies
character.belongsToMany(movie, {through: 'character_movie'});
movie.belongsToMany(character, {through: 'character_movie'});

export default {genre, movie, character};