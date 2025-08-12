import { Sequelize } from 'sequelize';
import config from './config/database.js';
import createUser from './models/User.js';
import createCuento from './models/Cuento.js';
import createStory from './models/Story.js';
import createDecision from './models/Decision.js';
import createOption from './models/Option.js';
import createUserSession from './models/UserSession.js';
import createUserChoice from './models/UserChoice.js';

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
const Story = createStory(sequelize, Sequelize);
const Decision = createDecision(sequelize, Sequelize);
const Option = createOption(sequelize, Sequelize);
const UserSession = createUserSession(sequelize, Sequelize);
const UserChoice = createUserChoice(sequelize, Sequelize);

// Relaciones existentes
User.hasMany(Cuento, { foreignKey: 'userId', as: 'cuentos' });
Cuento.belongsTo(User, { foreignKey: 'userId', as: 'usuario' });

// Nuevas relaciones para Stories interactivos
User.hasMany(Story, { foreignKey: 'userId', as: 'stories' });
Story.belongsTo(User, { foreignKey: 'userId', as: 'usuario' });

Story.hasMany(Decision, { foreignKey: 'story_id', as: 'decisions' });
Decision.belongsTo(Story, { foreignKey: 'story_id', as: 'story' });

Decision.hasMany(Option, { foreignKey: 'decision_id', as: 'options' });
Option.belongsTo(Decision, { foreignKey: 'decision_id', as: 'decision' });

User.hasMany(UserSession, { foreignKey: 'user_id', as: 'sessions' });
UserSession.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Story.hasMany(UserSession, { foreignKey: 'story_id', as: 'sessions' });
UserSession.belongsTo(Story, { foreignKey: 'story_id', as: 'story' });

UserSession.hasMany(UserChoice, { foreignKey: 'session_id', as: 'choices' });
UserChoice.belongsTo(UserSession, { foreignKey: 'session_id', as: 'session' });

Option.hasMany(UserChoice, { foreignKey: 'option_id', as: 'choices' });
UserChoice.belongsTo(Option, { foreignKey: 'option_id', as: 'option' });

export { sequelize, User, Cuento, Story, Decision, Option, UserSession, UserChoice };