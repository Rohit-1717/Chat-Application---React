import Message from "./Message";

const ChatBox = () => {
  const message = [
    {
      id: 1,
      userName:"Alex",
      text: "Hello There",
    },
    {
      id: 2,
      userName:"Mice",
      text: "hyy!!",
    },
  ];

  return (
    <div className="pb-44 pt-20 containerWrap">
      {message.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};

export default ChatBox;
