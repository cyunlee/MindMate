export const NounModel = (sequelize: any, DataTypes: any) => {
    const Noun = sequelize.define(
        'Noun',
        {
            noun: {
                type: DataTypes.STRING(30)
            }
        },
        {
            freezeTableName: true,
        }
    )
    return Noun;
}