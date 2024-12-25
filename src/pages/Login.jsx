import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const { user, googleSignIn } = UserAuth();
  const navigate = useNavigate();

  // console.log("user in login: ", user);

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/chat");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-6 sm:p-8 rounded-xl shadow-2xl"
      >
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-primary">
            Hello there
            <motion.span
              initial={{ rotate: -45 }}
              animate={{ rotate: 0 }}
              transition={{
                delay: 0.5,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className="inline-block ml-2"
            >
              👋🏻
            </motion.span>
          </h1>
        </motion.div>

        <motion.p
          className="text-center text-gray-600 text-sm sm:text-base md:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Join the conversation, meet new people, and make connections in one
          shared room.
        </motion.p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full"
        >
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
          >
            <FcGoogle className="w-6 h-6 mr-2" />
            Login with Google
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Login;
