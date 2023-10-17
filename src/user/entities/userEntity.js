const User = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
      },
      phoneNumber: {
        type: DataTypes.STRING(11),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(11),
        allowNull: false,
      },
      birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      underscored: true,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
    },
  );
  User.associate = db => {
    db.User.hasMany(db.Application, { foreignKey: 'userId', sourceKey: 'id' }); // foreignKey는 User 모델의 userId, sourceKey는 User 모델의 id
  };

  return User;
};

export default User;
