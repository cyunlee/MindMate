export const UserModel = (sequelize: any, DataTypes: any) => {
    const User = sequelize.define(
        'Users',
        {
            userid: {
                primaryKey: true,
                type: DataTypes.STRING(30),
            },
            password: {
                type: DataTypes.STRING(1000),
                allowNull: false,
            },
            nickname: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            isExpert: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue : false
            }
        }
    );
    return User;
}