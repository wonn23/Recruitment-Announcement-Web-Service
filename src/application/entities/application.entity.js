const Application = (sequelize, DataTypes) => {
  const Application = sequelize.define(
    'Application',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      status: {
        type: DataTypes.STRING(5),
        allowNull: false,
        unique: true,
      },
      resume: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      dateApplied: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      underscored: true,
      modelName: 'Application',
      tableName: 'applications',
      paranoid: true,
    },
  );
  Application.associate = db => {
    db.Application.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' }); // foreignKey는 User 모델의 userId, targetKey는 User 모델의 id
    db.Application.belongsTo(db.Post, { foreignKey: 'postId', targetKey: 'id' }); // foreignKey는 Post 모델의 postId, targetKey는 Post 모델의 id
  };

  return Application;
};

export default Application;
