export const PostModel = (sequelize:any, DataTypes: any) => {
    const Post = sequelize.define(
        'Posts',
    {
        postid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        postType: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        content: {
            type: DataTypes.STRING(2000),
            allowNull: false
        },
        userid: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        nickname: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        categoryVal: {
            type: DataTypes.STRING(30),
            allowNull: false
        }
    },
    );
    return Post;
}