import { Model, DataTypes }from 'sequelize';
import { sequelize } from '../db.js';


class Genre extends Model {}
Genre.init({
    name: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
        },
        allowNull: false,
        unique: true,
    },
    image: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
        },
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'genre',
})

export default Genre;