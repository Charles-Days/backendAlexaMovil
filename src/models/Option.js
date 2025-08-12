export default (sequelize, DataTypes) => {
  const Option = sequelize.define('Option', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    decision_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'decisions',
        key: 'id'
      }
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    next_decision_number: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 2,
        max: 3
      }
    },
    ending_text: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'options',
    timestamps: true
  });

  return Option;
};