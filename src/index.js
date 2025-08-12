import { Sequelize } from 'sequelize';
import config from './config/database.js';
import createUser from './models/User.js';
import createCuento from './models/Cuento.js';
import createStory from './models/Story.js';
import createStoryNode from './models/StoryNode.js';
import createStoryChoice from './models/StoryChoice.js';
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
const StoryNode = createStoryNode(sequelize, Sequelize);
const StoryChoice = createStoryChoice(sequelize, Sequelize);
const UserSession = createUserSession(sequelize, Sequelize);
const UserChoice = createUserChoice(sequelize, Sequelize);

// Relaciones existentes (cuentos tradicionales)
User.hasMany(Cuento, { foreignKey: 'userId', as: 'cuentos' });
Cuento.belongsTo(User, { foreignKey: 'userId', as: 'usuario' });

// Relaciones para Stories interactivos
User.hasMany(Story, { foreignKey: 'userId', as: 'stories' });
Story.belongsTo(User, { foreignKey: 'userId', as: 'usuario' });

Story.hasMany(StoryNode, { foreignKey: 'story_id', as: 'nodes' });
StoryNode.belongsTo(Story, { foreignKey: 'story_id', as: 'story' });

StoryNode.hasMany(StoryChoice, { foreignKey: 'node_id', as: 'choices' });
StoryChoice.belongsTo(StoryNode, { foreignKey: 'node_id', as: 'node' });

User.hasMany(UserSession, { foreignKey: 'user_id', as: 'sessions' });
UserSession.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Story.hasMany(UserSession, { foreignKey: 'story_id', as: 'sessions' });
UserSession.belongsTo(Story, { foreignKey: 'story_id', as: 'story' });

UserSession.hasMany(UserChoice, { foreignKey: 'session_id', as: 'choices' });
UserChoice.belongsTo(UserSession, { foreignKey: 'session_id', as: 'session' });

export { sequelize, User, Cuento, Story, StoryNode, StoryChoice, UserSession, UserChoice };