const Message = ({ message }) => {
  return (
    <div>
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="User Image"
              src=""
            />
          </div>
        </div>
        <div className="chat-header">
          {message.userName}
        </div>
        <div className="chat-bubble">{message.text}</div>
      </div>
    
    </div>
  );
};

export default Message;