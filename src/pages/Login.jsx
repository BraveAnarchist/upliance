import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [user,setUser]=useState({email:"",password:""});

  const navigate = useNavigate();


  function handleLogin(e){
    e.preventDefault();
    let data = JSON.parse(localStorage.getItem("users"));
    
    if (data == null) {
      alert("Please register first")
        return;
    }
  
    if (user.email == "") {
        alert("Please enter the email");
        return
    }
    if (user.password == "") {
        alert("Please enter the password");
        return
    }
  
    let current;
    let flag=true;
    data.some(ele => {
        if (ele.email == user.email && ele.password == user.password) {
            current = ele;
            alert('Logged in successfully');
            current = JSON.stringify(current);
            localStorage.setItem("currUser", current);
            navigate("/");
            flag=false
            return;
        } 
  
    });
    if(flag){
      alert("incorrect credentials")
      return;
    }
  
  
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="upliance.ai"
            src="/purple_icon_jxvyv0.webp"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({...user,email:e.target.value})}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={(e) => setUser({...user,password:e.target.value})}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={handleLogin}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>

            <div></div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Dont have an account?{" "}
            <Link
              to={"/Register"}
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}