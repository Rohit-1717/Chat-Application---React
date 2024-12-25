import { UserAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const Message = ({ message }) => {
  const { user } = UserAuth();
  const isOwnMessage = message.uid === user.uid;

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    if (isNaN(date)) return "";
    return date.toLocaleTimeString("default", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`flex ${
          isOwnMessage ? "flex-row-reverse" : "flex-row"
        } max-w-[80%] sm:max-w-[70%] md:max-w-[60%]`}
      >
        <div className="flex flex-col items-center mr-2 ml-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden">
            <img
              alt={`${message.name}'s avatar`}
              src={message.avatar}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div
          className={`flex flex-col ${
            isOwnMessage ? "items-end" : "items-start"
          }`}
        >
          <div className="text-sm font-semibold mb-1">{message.name}</div>
          <div
            className={`px-4 py-2 rounded-lg ${
              isOwnMessage
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-800"
            } shadow-md`}
          >
            <p className="text-sm sm:text-base break-words">{message.text}</p>
            {message.timestamp && (
              <span className="text-xs mt-1 block opacity-70">
                Sent at {formatTimestamp(message.timestamp)}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Message;
