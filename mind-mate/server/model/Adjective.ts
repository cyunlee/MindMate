export const AdjectiveModel = (sequelize: any, DataTypes: any) => {
    const Adjective = sequelize.define(
        'Adjectives',
        {
            adjective: {
                type: DataTypes.STRING(30)
            }
        },
    );
    return Adjective;
}