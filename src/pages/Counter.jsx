import React, { useState, useEffect,useRef } from "react";
import { useSpring, animated } from "react-spring";
import Nav from "../components/Nav";

let current,
  users = JSON.parse(localStorage.getItem("users")),
  currUser;

export default function Counter() {
  const [count, setCount] = useState(0);
  let counterHist = useRef([]);

  const brightness = count % 100;
  const backgroundColor = `hsl(240, 100%, ${brightness}%)`;

  const animatedStyle = useSpring({
    backgroundColor,
    config: { duration: 500 },
  });

  const fadeAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(1000px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 100, friction: 30 },
  });

  useEffect(() => {
    if (localStorage.getItem("currUser")) {
      currUser = JSON.parse(localStorage.getItem("currUser"));

      current = users.find((ele) => {
        if (ele.email == currUser.email) {
          return true;
        }
        return false;
      });
      console.log(current);
      if (current) {
        counterHist = current.counterHistory;
      }
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem("currUser") && counterHist.current && current) {
      console.log(count);
      console.log(counterHist.current)
      counterHist.current.push(count);
      users = users.map((ele) => {
        if (ele.email == current.email) {
          ele.counterHistory = counterHist;
          return ele;
        } else return ele;
      });
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [count]);

  return (
    <>
      <Nav now="Counter" />
      <animated.div
        className="h-screen flex flex-col items-center justify-center"
        style={{ ...animatedStyle, ...fadeAnimation }}
      >
        <h1 className="text-4xl text-[#00FF00]">Counter: {count}</h1>
        <div style={{ display: "flex", gap: "1vw", marginTop: "5vh" }}>
          <button
            className="bg-blue-600 hover:bg-blue-500 text-white p-1.5 rounded-lg"
            onClick={() => setCount(count + 1)}
          >
            Increment
          </button>
          <button
            className=" bg-gray-600 hover:bg-gray-500 text-white p-1.5 rounded-lg"
            onClick={() => setCount(0)}
          >
            Reset
          </button>
          <button
            className="bg-red-600  hover:bg-red-500 text-white p-1.5 rounded-lg"
            onClick={() => setCount(count - 1)}
          >
            Decrement
          </button>
        </div>
      </animated.div>
    </>
  );
}
