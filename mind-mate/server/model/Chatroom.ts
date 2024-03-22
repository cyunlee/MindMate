export const ChatroomModel = (sequelize: any, DataTypes: any) => {
    const Chatroom = sequelize.define(
        'Chatrooms',
        {
            chatroomID: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            userid: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            isChatBot: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue : true,
            },
            chatToExpert: {
                type: DataTypes.STRING(30),
                allowNull: true,
            }
        }
    );
    return Chatroom;
}