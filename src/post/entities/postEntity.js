const Post = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      requirement: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      salary: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      education: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      position: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      skill: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      award: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM(
          '정규직',
          '계약직',
          '인턴',
        ),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
      deadline: {
        type: DataTypes.DATEONLY,
        allowNull: true
      }
    },
    {
      sequelize,
      timestamps: true,
      underscored: true,
      modelName: 'Post',
      tableName: 'posts',
      paranoid: true,
    },
  );
  Post.associate = db => {
    db.Post.hasMany(db.Application, { foreignKey: 'postId', sourceKey: 'id' }); // foreignKey는 Post 모델의 postId, targetKey는 Post 모델의 id
    db.Post.belongsTo(db.Company, { foreignKey: 'companyId', targetKey: 'id' }); // foreignKey는 Company 모델의 companyId, targetKey는 Company 모델의 id
  };

  return Post;
};

export default Post;
