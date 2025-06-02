import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLoginMutation, useRegisterMutation } from "../redux/api/api";
import { userExist } from "../redux/reducers/auth";
import { useDispatch } from "react-redux";


const Login = () => {
  const [login, { data: loginData ,isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { data: registerData,isLoading: isRegisterLoading, }] = useRegisterMutation();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const toggleMode = () => setIsLogin(!isLogin);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Please wait...", {
      position: "top-center",
    });
    try {
      if (isLogin) {
        await login({
          email: formData.email,
          password: formData.password,
        }).unwrap();
      } else {
        await register(formData).unwrap();
      }
    } catch (err) {
      toast.error(err.message || "An unknown error occurred");
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (loginData?.user) {
      dispatch(userExist(loginData.user));
      toast.success(loginData.message || "Logged in successfully");
    }
  }, [loginData, dispatch]);

  useEffect(() => {
    if (registerData?.user) {
      dispatch(userExist(registerData.user));
      toast.success(registerData.message || "Registered successfully");
    }
  }, [registerData, dispatch]);

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-80 p-6 bg-white rounded shadow flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold text-center">
          {isLogin ? "Login" : "Register"}
        </h2>

        {!isLogin && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="border p-2 rounded"
            value={formData.username}
            onChange={handleChange}
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p className="text-sm text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={toggleMode}
            className="text-blue-600 underline ml-1"
            disabled={isLoginLoading||isRegisterLoading}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
