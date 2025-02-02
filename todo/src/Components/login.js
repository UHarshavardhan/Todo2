import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image1 from "../Assests/ach3 1.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function LogIn() {
  const navigate = useNavigate();

  const inputFields = [
    { placeholder: "Enter Your Mail Id", name: "email", type: "email" },
    { placeholder: "Password", name: "password", type: "password" },
  ];

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "email" ? value.toLowerCase() : value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("https://todo2-6.onrender.com/api/v1/login", formData);

      if (response.status === 200) {
        const { token, user } = response.data;
        console.log(response.data);
        localStorage.setItem("token", token);
        localStorage.setItem("userId", user.userId); 
        localStorage.setItem("userName", user.name); 
        localStorage.setItem("userEmail", user.email); 

        toast.success("Login Successful");

       
        navigate("/home");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="main-component grid grid-cols-1 lg:grid-cols-2 items-center p-6 lg:p-24 min-h-screen bg-gradient-to-r from-blue-200 to-indigo-200">
      
        <div className="form flex flex-col gap-6 mx-auto max-w-md lg:max-w-lg">
          <h5 className="text-3xl lg:text-5xl text-center">Sign In</h5>

          {inputFields.map((field, index) => (
            <div key={index} className="w-full">
              <input
                className="border w-full h-[40px] lg:h-[50px] rounded-xl border-gray-400 p-4 lg:text-lg lg:w-96"
                type={field.type}
                name={field.name}
                required
                placeholder={field.placeholder}
                onChange={handleChange}
              />
            </div>
          ))}

          <div className="text-center">
            <button
              className="bg-[#FF9090] w-[129px] h-[40px] rounded-lg text-white shadow-lg hover:bg-[#FF7070]"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </div>

    
        <div className="flex justify-center mt-6 lg:mt-0">
          <img
            src={image1}
            alt="user illustration"
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </>
  );
}

export default LogIn;
