export const NounModel = (sequelize: any, DataTypes: any) => {
    const Noun = sequelize.define(
        'Nouns',
        {
            noun: {
                type: DataTypes.STRING(30)
            }
        },
    )
    return Noun;
}