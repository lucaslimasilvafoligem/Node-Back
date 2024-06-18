import { Sequelize } from 'sequelize';

const conn = new Sequelize('nodesequelize', 'root', 'lucas2112', {
    host: 'localhost',
    dialect: 'mysql'
});

// b

export default conn;
