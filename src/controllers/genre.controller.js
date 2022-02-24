import Genre from '../database/models/genre.js';
import Movie from '../database/models/movie.js';


//Function used by GET method in the genre router
export async function getGenres() {
    const genres = await Genre.findAll({attributes: ['image', 'name']});
    if(!genres) return false;
    return genres;
}

//Function used by POST method in the genre router
export async function createGenre(body) {
    if(!body.image || !body.name) return false;
    const genre = await Genre.create({
        image: body.image,
        name: body.name,
    })
    return genre;
}


////Function used by PUT method in the genre router
export async function updateGenre(name, body) {
    const genre = await Genre.findOne({where: {name: name}});
    if(body.name) await genre.update({name: body.name});
    if(body.image) await genre.update({image: body.image});

    return genre;
}


//Function used by DELETE method in the genre router
export async function deleteGenre(name) {
    const genre = await Genre.findOne({where: {name: name}});
    if(!genre) return false;
    genre.destroy();
    return true;
} 