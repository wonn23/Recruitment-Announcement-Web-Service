const Company = (sequelize, DataTypes) => {
  const Company = sequelize.define(
    'Company',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
      },
      location: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      industry: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      size: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      underscored: true,
      modelName: 'Company',
      tableName: 'companies',
      paranoid: true,
    },
  );
  Company.associate = db => {
    db.Company.hasMany(db.Post, { foreignKey: 'companyId', sourceKey: 'id' }); // foreignKey는 Company 모델의 companyId, sourceKey는 Company 모델의 id
  };

  return Company;
};

export default Company;
