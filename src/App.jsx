import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ToastContainer, toast } from 'react-toastify'
import Register from "./pages/Register";
import Login from "./pages/Login";
import Counter from "./pages/Counter";

import { BrowserRouter, Routes, Route} from "react-router-dom";
import Nav from "./components/Nav";
import Form from "./pages/Form";
import TextEditor from "./pages/TextEditor";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/Dashboard" element={<><ProtectedRoute><Dashboard/></ProtectedRoute></>}></Route>
          <Route path="/" element={<><ProtectedRoute><Counter/></ProtectedRoute></>} />
          <Route path="/TextEditor" element={<><ProtectedRoute><TextEditor /></ProtectedRoute></>} />
          <Route path="/Form" element={<><ProtectedRoute><Form /></ProtectedRoute></>} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
