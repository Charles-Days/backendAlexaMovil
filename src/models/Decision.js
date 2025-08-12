export default (sequelize, DataTypes) => {
  const Decision = sequelize.define('Decision', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    story_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'stories',
        key: 'id'
      }
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 3
      }
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'decisions',
    timestamps: true
  });

  return Decision;
};