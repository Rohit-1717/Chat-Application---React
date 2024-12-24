import React from "react";

function Login() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there 👋🏻</h1>
          <p className="py-6">
            Join the conversation, meet new people, and make connections in one
            shared room.
          </p>
          <button className="btn btn-primary">Login with Google</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
