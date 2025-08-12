import { Sequelize } from 'sequelize';
import config from './config/database.js';
import createUser from './models/User.js';
import createCuento from './models/Cuento.js';

const environment = process.env.NODE_ENV || 'development';
const dbConfig = config[environment];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  logging: dbConfig.logging
});

const User = createUser(sequelize, Sequelize);
const Cuento = createCuento(sequelize, Sequelize);

User.hasMany(Cuento, { foreignKey: 'userId', as: 'cuentos' });
Cuento.belongsTo(User, { foreignKey: 'userId', as: 'usuario' });

export { sequelize, User, Cuento };