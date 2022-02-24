import { Model, DataTypes }from 'sequelize';
import { sequelize } from '../db.js';
import Movie from './movie.js';

class Character extends Model {};
Character.init({
    image: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
        },
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
        },
        allowNull: false,
        unique: true,
    },
    age: {
        type: DataTypes.INTEGER,
        validate: {
            isInt: true,
            notEmpty: true
        },
        allowNull: false,
    },
    weight: {
        type: DataTypes.FLOAT,
        validate: { 
            isFloat: true,
            notEmpty: true
        },
        allowNull: false,
    },
    history: {
        type: DataTypes.TEXT,
        validate: {
            notEmpty: true,
        },
        allowNull: false,
    },
}, {
    sequelize, 
    modelName: 'characters',
})


export default Character;