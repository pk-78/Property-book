import React, { useState } from "react";
import "../styles/Login.scss";
import { setLogin } from "../redux/state";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import url from "../url";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      /* Get data after fetching */
      const loggedIn = await response.json();
      console.log(loggedIn);

      if (
        loggedIn.message === "User doesn't exist!" ||
        loggedIn.message === "Invalid Credentials!"
      ) {
        // alert("User doesnt exist");
        toast.error("User does not exist or Invalid credentials");
      } else if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        toast.success("Welcome");
        navigate("/");
      }
    } catch (err) {
      console.log("Login failed", err.message);
    }
  };

  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">LOG IN</button>
        </form>
        <a href="/register">Don't have an account? Sign Up Here</a>
      </div>
    </div>
  );
};

export default LoginPage;
