import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('tought2', 'root', 'lucas2112', {
    host: 'localhost',
    dialect: 'mysql'
});

try {
    sequelize.authenticate();
    console.log('Conectamos com sucesso');
} catch (error) {
    console.log(`Falha na conexão: ${error}`);
}

export default sequelize;
