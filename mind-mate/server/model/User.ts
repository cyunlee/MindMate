export const UserModel = (sequelize: any, DataTypes: any) => {
    const User = sequelize.define(
        'User',
        {
            userId: {
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
            }
        }
    );
    return User;
}