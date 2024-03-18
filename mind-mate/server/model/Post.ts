export const PostModel = (sequelize:any, DataTypes: any) => {
    const Post = sequelize.define(
        'Post',
    {
        postid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true

        },
        postType: {
            type: DataTypes.STRING(30)
        },
        title: {
            type: DataTypes.STRING(100)
        },
        content: {
            type: DataTypes.STRING(2000),
        },
        userid: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        nickname: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        likesNum: {
            type: DataTypes.INTEGER
        },
        commentsNum: {
            type: DataTypes.INTEGER
        }
    },
    {
        freezeTableName: true,
    }
    );
    return Post;
}