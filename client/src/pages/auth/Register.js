import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { sendSignInLinkToEmail } from "firebase/auth";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  let navigate = useNavigate();

  useEffect(() => {
    if (user && user.token) navigate("/");
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await sendSignInLinkToEmail(auth, email, config);

    toast.success(
      `Email is sent to ${email}. Click the link to complete your registration`
    );

    window.localStorage.setItem("emailForRegistration", email);

    setEmail("");
  };

  const registerForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="form-control"
          placeholder="Your Email"
          autoFocus
        />
        <br />
        <button type="submit" className="btn btn-raised">
          Register
        </button>
      </form>
    );
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>

          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
