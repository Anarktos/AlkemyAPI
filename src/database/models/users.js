import { Model, DataTypes }from 'sequelize';
import { sequelize } from '../db.js';

class Users extends Model {};
Users.init({
    
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true,
            notEmpty: true
        },
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
        }, 
        allowNull: false,
    }
},{
    sequelize,
    modelName: 'users',
})

export default Users;