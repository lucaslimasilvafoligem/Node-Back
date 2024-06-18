import { DataTypes } from 'sequelize';
import db from '../db/index.mjs';

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    occupation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    newsletter: {
        type: DataTypes.BOOLEAN,
    },
});

export default User;
