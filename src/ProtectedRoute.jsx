import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

let current;
function ProtectedRoute({ children }) {
  const navigate=useNavigate();
  useEffect(() => {  
          current= JSON.parse(localStorage.getItem("currUser"));
          if (!current) {
            navigate("/Login");
          }
        }, []);


  return children;
}
export default ProtectedRoute;