import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { userContext } from "../userContext";

const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(userContext);

  const loginUser = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/users/login", { email, password });
      alert("Login Success");
      setUser(data);

      setRedirect(true);
    } catch (error) {
      alert("Login failed");
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mt-4 grow flex  items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto " onSubmit={loginUser}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="sumbit" className="primary">
            Login
          </button>
          <div className="text-center py-2 text-gray-500">
            Don't have an Account Yet?{" "}
            <Link className="underline text-black" to="/register">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Loginpage;
