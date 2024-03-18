export const AdjectiveModel = (sequelize: any, DataTypes: any) => {
    const Adjective = sequelize.define(
        'Adjective',
        {
            adjective: {
                type: DataTypes.STRING(30)
            }
        },
        {
            freezeTableName: true,
        }
    );
    return Adjective;
}