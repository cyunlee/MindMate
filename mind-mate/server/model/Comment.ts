export const CommentModel = (sequelize:any, DataTypes: any) => {
    const Comment = sequelize.define(
        'Comments',
        {
            commetid: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            postid: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            userid: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            content: {
                type: DataTypes.STRING(1000),
                allowNull: false,
            }

        }
    );
    return Comment;
}