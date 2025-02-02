import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Counter from "./pages/Counter";

import { BrowserRouter, Routes, Route} from "react-router-dom";
import Nav from "./components/Nav";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<><Nav/><Counter /></>} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
