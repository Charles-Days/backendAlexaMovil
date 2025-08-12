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
    decision_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 3
      }
    },
    option_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'options',
        key: 'id'
      }
    }
  }, {
    tableName: 'user_choices',
    timestamps: true
  });

  return UserChoice;
};