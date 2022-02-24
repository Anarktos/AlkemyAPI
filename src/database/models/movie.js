import { Model, DataTypes }from 'sequelize';
import { sequelize } from '../db.js';
import Character from './characters.js';

class Movie extends Model {};
Movie.init({
    image: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
        }, 
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
        },
        allowNull: false,
        unique: true,
    },
    releaseDate: {
        type: DataTypes.DATE,
        validate: {
            isDate: true,
            notEmpty: true,
        },
        allowNull: false,
    },
    rating: {
        type: DataTypes.FLOAT,
        validate: {
            min: 1,
            max: 5,
            notEmpty: true
        },
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'movies',
})


export default Movie;