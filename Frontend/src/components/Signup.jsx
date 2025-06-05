import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  // THIS IS THE USESTa
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:3000/user/signup",
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(data);
      toast.success("User Registered Successfully");
      localStorage.setItem("jwt",data.token)
      navigateTo("/login")
      

      setUsername("")
      setEmail("")
      setPassword("")
      
      
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 409) {
        toast.error("User already exists with this email");
      } else if (error.response && error.response.status === 400) {
        toast.error(error.response.data.msg || "Please fill all fields");
      } else {
        toast.error("Something went wrong. Try again later.");
      }
    }
  };

  return (
    <div>
      <div>
        <div className="flex h-screen items-center justify-center bg-gray-100">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-5 text-center">Signup</h2>
            <form onSubmit={handleRegister}>
              {/* Username */}
              <div className="mb-4">
                <label htmlFor="" className="block mb-2 font-semibold">
                  User-Name
                </label>
                <input
                  type="text"
                  placeholder="Type Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              {/* email */}
              <div className="mb-4">
                <label htmlFor="" className="block mb-2 font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Type Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {/* password */}
              <div className="mb-4">
                <label htmlFor="" className="block mb-2 font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="*********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                className="w-full bg-blue-600 text-white rounded-xl font-semibold p-3"
                type="submit"
              >
                SignUp
              </button>
              <p className="mt-4 text-center text-gray-500">
                Already Have An Account ?{" "}
                <Link to={"/login"} className="text-red-400 hover:underline">
                  Yes
                </Link>{" "}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
