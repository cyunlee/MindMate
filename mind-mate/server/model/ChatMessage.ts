// ChatMessage model
export const ChatMessageModel = (sequelize: any, DataTypes: any) => {
    const ChatMessage = sequelize.define('ChatMessages', {
        chatNo: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,            
          primaryKey: true,
      },
      chatroomID: {
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
      },
    });
  
    return ChatMessage;
  };