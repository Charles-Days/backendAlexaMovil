export default (sequelize, DataTypes) => {
  const UserSession = sequelize.define('UserSession', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    story_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'stories',
        key: 'id'
      }
    },
    current_node_id: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'start'
    },
    status: {
      type: DataTypes.ENUM('in_progress', 'finished'),
      allowNull: false,
      defaultValue: 'in_progress'
    }
  }, {
    tableName: 'user_sessions',
    timestamps: true
  });

  return UserSession;
};