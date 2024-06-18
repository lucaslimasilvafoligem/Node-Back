import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('nodesequelize', 'root', 'lucas2112', {
    host: 'localhost',
    dialect: 'mysql'
});

try {
    sequelize.authenticate();
    console.log('Conectado com sucesso');
} catch (err) {
    console.log('Não foi possível conectar', error);
}

export default sequelize;
