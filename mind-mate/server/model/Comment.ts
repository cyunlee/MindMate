export const CommentModel = (sequelize:any, DataTypes: any) => {
    const Comment = sequelize.define(
        'Comments',
        {
            postid: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            content: {
                type: DataTypes.STRING(1000),
                allowNull: false,
            },
            nickname: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            commentid: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },

        }
    );
    return Comment;
}