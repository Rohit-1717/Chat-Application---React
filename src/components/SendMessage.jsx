import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { FiSend, FiLoader } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const SendMessage = () => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = UserAuth();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (value.trim() === "") return;

    try {
      setIsLoading(true);
      if (!user) return;

      const { uid, displayName, photoURL } = user;
      await addDoc(collection(db, "messages"), {
        text: value,
        name: displayName,
        avatar: photoURL,
        createdAt: serverTimestamp(),
        uid,
      });
      setValue("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-base-200/80 backdrop-blur-sm p-4 md:p-6"
    >
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSendMessage} className="flex gap-2 items-center">
          <div className="relative flex-1">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="input input-bordered w-full pr-12 bg-base-100/60"
              placeholder="Type your message..."
              disabled={isLoading}
              maxLength={500}
            />
            <AnimatePresence>
              {value.length > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs opacity-60"
                >
                  {value.length}/500
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <motion.button
            type="submit"
            className="btn btn-primary btn-circle"
            disabled={isLoading || !value.trim()}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            {isLoading ? (
              <FiLoader className="h-5 w-5 animate-spin" />
            ) : (
              <FiSend className="h-5 w-5" />
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default SendMessage;
