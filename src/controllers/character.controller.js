import Character from '../database/models/characters.js';
import Movie from '../database/models/movie.js';



//Functions used by GET method in the characters router
export async function findAll() {
    const characters = await Character.findAll({ attributes: ['image', 'name'] });
    return characters;
}

export async function findCharactersDetail() {
    const characters = await Character.findAll({
        attributes: ['id', 'image', 'name', 'age', 'weight', 'history'],
        include: {
            model: Movie,
            attributes: ['title'],
            through: { attributes: [] }
        }
    })
    return characters;
}

export async function findByName(name) {
    const character = await Character.findOne({
        where: { name: name },
        attributes: ['id', 'image', 'name', 'age', 'weight', 'history'],
    });
    return character;
}

export async function findByAge(age) {
    const characters = await Character.findAll({
        where: { age: age },
        attributes: ['id', 'image', 'name', 'age', 'weight', 'history'],
    });
    return characters;
}


export async function findByMovie(movie) {
    const characters = await Character.findAll({
        attributes: ['id', 'image', 'name', 'age', 'weight', 'history'],
        include: {
            model: Movie,
            where: {
                id: movie,
            },
            attributes: ['title'],
            through: { attributes: [] }
        }
    })
    return characters;
}


//Function used by the POST in the characters router
export async function createCharacter(body) {
    const movie = await Movie.findByPk(body.movieId)
    try {
        const character = await Character.create({
            image: body.image,
            name: body.name,
            age: body.age,
            weight: body.weight,
            history: body.history,
        })
        character.addMovies(movie);
        return character;
    } catch (error) {
        if (error) return false;
    }
}


//Function used by the PUT method in the characters router
export async function updateCharacter(name, body) {
    if (body.age && parseInt(body.age) !== body.age) return false;
    if (body.weight && parseInt(body.weight) !== body.weight) return false;

    const character = await Character.findOne({
        where: { name: name },
        attributes: ['id', 'image', 'name', 'age', 'weight', 'history'],
    });

    if (!character) return false;
    if (body.name) await character.update({ name: body.name });
    if (body.image) await character.update({ image: body.image });
    if (body.age) await character.update({ age: body.age });
    if (body.weight) await character.update({ weight: body.weight });
    if (body.history) await character.update({ history: body.history });

    return character;

}


//Function used by the DELETE method in the characters router
export async function deleteCharacter(name) {
    const character = await Character.findOne({ where: { name: name } });
    if (!character) return false;
    await character.destroy();
    return true;
}



