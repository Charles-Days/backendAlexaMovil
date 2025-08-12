export default (sequelize, DataTypes) => {
  const UserChoice = sequelize.define('UserChoice', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    session_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user_sessions',
        key: 'id'
      }
    },
    from_node_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    choice_text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    to_node_id: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'user_choices',
    timestamps: true
  });

  return UserChoice;
};