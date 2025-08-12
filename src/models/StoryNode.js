export default (sequelize, DataTypes) => {
  const StoryNode = sequelize.define('StoryNode', {
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
    node_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    is_ending: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'story_nodes',
    timestamps: true,
    indexes: [
      {
        fields: ['story_id', 'node_id'],
        unique: true
      }
    ]
  });

  return StoryNode;
};