export const ExpertAnswerModel = (sequelize: any, DataTypes: any) => {
    const ExpertAnswer = sequelize.define(
        'ExpertAnswers',
        {
            postid: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            userid: {
                type: DataTypes.STRING(30),
                allowNull: false
            },
            title: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            content: {
                type: DataTypes.STRING(1000),
                allowNull: false
            }
        }
    );
    return ExpertAnswer;
}