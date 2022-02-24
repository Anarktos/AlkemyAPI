import Movie from '../database/models/movie.js';
import character from '../database/models/characters.js';
import Genre from '../database/models/genre.js';



//Functions used by GET method in the movies router
export async function getMovies() {
    const movies = await Movie.findAll({ attributes: ['id', 'image', 'title', 'releaseDate'] });
    return movies;
}

export async function getMoviesDetail() {
    const movies = await Movie.findAll({
        attributes: ['image', 'title', 'releaseDate', 'rating', 'genreId'],
        include: {
            model: character,
            attributes: ['name'],
            through: { attributes: [] }
        }
    });
    return movies;
}

export async function getMovieByName(title) {
    const movie = await Movie.findOne({
        where: { title: title },
        attributes: ['image', 'title', 'releaseDate', 'rating', 'genreId'],
    });
    return movie
}

export async function getByGenre(id) {
    const movies = await Movie.findAll({
        where: { genreId: id },
        attributes: ['image', 'title', 'releaseDate', 'rating', 'genreId'],
    });
    return movies;
}

export async function getMoviesOrder(order) {
    const movies = await Movie.findAll({
        order: [['releaseDate', order]],
        attributes: ['image', 'title', 'releaseDate', 'rating', 'genreId'],
    });
    return movies;
}

//Function used by POST method in the movies router
export async function createMovie(body) {
    try {
        const genre = await Genre.findByPk(body.genreId);
        const movie = await Movie.create({
            image: body.image,
            title: body.title,
            releaseDate: body.releaseDate,
            rating: body.rating,
        })
        await genre.addMovies(movie);
        return movie;
    } catch (error) {
        return false;
    }
}


//Function used by PUT method in the movies router
export async function updateMovie(title, body) {
    if (parseFloat(body.rating) !== body.rating) return false;
    if(body.rating > 5 || body.rating < 1) return false;

    const movie = await Movie.findOne({
        where: { title: title },
        attributes: ['id', 'image', 'title', 'releaseDate', 'rating', 'genreId']
    });

    if (!movie) return false;

    if (body.image) await movie.update({ image: body.image });
    if (body.title) await movie.update({ title: title });
    if (body.releaseDate) await movie.update({ releaseDate: body.releaseDate });
    if (body.rating) await movie.update({ rating: body.rating });
    if (body.genre) {
        const genre = await Genre.findByPk(body.genre);
        await genre.addMovies(movie)
        return movie;
    }

    return movie;

}

//Function used by DELETE method in the movies router
export async function deleteMovie(title) {
    const movie = await Movie.findOne({ where: { title: title } });
    if (!movie) return false;
    await movie.destroy();
    return true;
}




