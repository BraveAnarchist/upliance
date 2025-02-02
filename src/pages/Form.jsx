import React from 'react'
import { useState,useEffect } from 'react';
import { v4 as uuidv4 } from "uuid";

let current,users,currUser;

export default function Form() {
      const[userData,setUserData]=useState({name:"",address:"",email:"",phone:""})
      const [isDirty, setIsDirty] = useState(false);
      

      useEffect(() => {
        users = JSON.parse(localStorage.getItem("users"));
        currUser= JSON.parse(localStorage.getItem("currUser"));
        current=users.find((ele)=>{
            if(ele.email==currUser.email){
                return true;
            }
            return false;
        })
        console.log(current.userData)
        if (current.userData) {
          setUserData(current.userData);
        }
      }, []);

      const handleChange = (e) => {
        setIsDirty(true);
        setUserData({ ...userData, [e.target.name]: e.target.value });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        const userId = userData.userId || uuidv4(); 
        const updatedData = { ...userData, userId };
        setUserData(updatedData);
        users=users.map((ele)=>{
            if(ele.email==current.email){
                ele.userData=updatedData;
                return ele;
            }
        })
        localStorage.setItem("users", JSON.stringify(users));
        setIsDirty(false);
      };

      useEffect(() => {
        const handleBeforeUnload = (e) => {
          if (isDirty) {
            e.preventDefault();
            e.returnValue = "You have unsaved changes!";
          }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
      }, [isDirty]);
      
      return (
        <>
          <form className="space-y-4 mx-[20vw] mt-[5vh] mb-[6vh]">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address:
              </label>
              <input
                type="text"
                name="address"
                value={userData.address}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone:
              </label>
              <input
                type="text"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
    
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </>
      );
}
