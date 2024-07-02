import { Sequelize } from "sequelize";

const sequelize = new Sequelize('nodemvc2', 'root', 'lucas2112', {
    host: 'localhost',
    dialect: 'mysql',
});

try {
    sequelize.authenticate();
    console.log('Conectamos ao MySQL');
} catch (error) {
    console.log(`Não fpoi possível conectar: ${error}`);
}

export default sequelize;