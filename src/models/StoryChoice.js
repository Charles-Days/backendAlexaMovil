export default (sequelize, DataTypes) => {
  const StoryChoice = sequelize.define('StoryChoice', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    node_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'story_nodes',
        key: 'id'
      }
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    next_node_id: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'story_choices',
    timestamps: true
  });

  return StoryChoice;
};