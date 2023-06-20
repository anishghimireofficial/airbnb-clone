import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Registerpage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/users/register", {
        name,
        email,
        password,
      });
      alert("Registration Successful. Now you can log in");
    } catch (error) {
      alert("Registration failed. please try again later");
    }
  };
  return (
    <div className="mt-4 grow flex  items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto " onSubmit={registerUser}>
          <input
            type="text"
            placeholder="john doe"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
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
            Regsiter
          </button>
          <div className="text-center py-2 text-gray-500">
            Already a Member?{" "}
            <Link className="underline text-black" to="/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registerpage;
