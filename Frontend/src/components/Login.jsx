import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

  // EXTRACTING THE EMAIL AND PASSWORD THAT ARE GIVEN BY THE USER TO FILL THE CREDENTIALS
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // EXTRACTING THE NAVIGATE FROM THE USENAVIGATE
  const navigate = useNavigate(); 


  // THIS FUNCTION WILL HANDLE THE LOGIN FUNCTIONALITY
  const handleLogin = async (e) => {

    // THIS WILL PROTACT THE WEBSITE TO RELOAD THE WEBISTE ON 
    e.preventDefault();

    
    try {

      // THIS WILL HIT THE LOGIN API AND EMAIL AND PASSWORD WILL BE SENT OVER THIS TO METCH THE CREDENTIALS FROM THE DATABASE
      const { data } = await axios.post(
        "https://full-stack-todo-app-backend-30vb.onrender.com/user/login",
        {

          // THIS IS THE GIVEN CREDENTIALS LIKE EMAIL AND PASSWORD FROM THE USER SIDE
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

      // IF THE CREDENTIALS WILL BE RIGHT THE ALERT WILL BE CALLED 
      toast.success("User Logged In Successfully");
       
      localStorage.setItem("jwt",data.token)
      navigate("/");
      setEmail("")
      setPassword("")

      // AND NAVIGATE TO THE HOME PAGE
      
    } catch (error) {

      // IF ANY ERROR WILL ENCOUNTER, THIS ALERT POPUP WILL BE DISPLAYED
      console.error(error);
      toast.error("Failed to Login");
    }
  };

  return (
    <div>
      <div className='flex h-screen items-center justify-center bg-gray-100'>
        <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
          <h2 className='text-2xl font-semibold mb-5 text-center'>Login</h2>


          <form onSubmit={handleLogin}>
            <div className='mb-4'>
              <label className='block mb-2 font-semibold'>Email</label>
              <input
                type="email"
                placeholder='Type Email Address Here'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full p-2 border border-gray-300 rounded'
              />
            </div>



            <div className='mb-4'>
              <label className='block mb-2 font-semibold'>Password</label>
              <input
                type="password"
                placeholder='*********'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full p-2 border border-gray-300 rounded'
              />
            </div>



            <button className='w-full bg-blue-600 text-white rounded-xl font-semibold p-3' type='submit'>
              Login
            </button>



            <p className='mt-4 text-center text-gray-500'>
              New User ?{" "}
              <Link to="/signup" className='text-red-400 hover:underline'>Signup </Link>
            </p>


          </form>

          
        </div>
      </div>
    </div>
  );
};

export default Login;
