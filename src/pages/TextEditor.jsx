import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSpring, animated } from "react-spring";
import Nav from "../components/Nav";

let current, users;
export default function TextEditor() {
  const [content, setContent] = useState("");

  const fadeAnimation = useSpring({
    from: { opacity: 0, transform: "translateX(1000px)" },
    to: { opacity: 1, transform: "translateX(0px)" },
    config: { tension: 100, friction: 30 },
  });

  useEffect(() => {
    users = JSON.parse(localStorage.getItem("users"));
    if (localStorage.getItem("currUser")) {
      const currUser = JSON.parse(localStorage.getItem("currUser"));
      current = users.find((ele) => {
        if (ele.email == currUser.email) {
          return true;
        }
        return false;
      });

      if (current.userData) {
        setContent(JSON.stringify(current.userData));
      }
    }
  }, []);

  const handleChange = (value) => {
    setContent(value);
    const extractJsonString = content.replace(/<[^>]*>/g, "");
    users = users.map((ele) => {
      if (ele.email == current.email) {
        ele.userData = JSON.parse(extractJsonString);
        return ele;
      } else return ele;
    });
    localStorage.setItem("users", JSON.stringify(users));
  };

  return (
    <>
      <Nav now="TextEditor" />
      <animated.div
        className="h-screen flex flex-col justify-center items-center gap-2"
        style={fadeAnimation}
      >
        <h2 className="text-2xl">Text Editor</h2>
        <ReactQuill
          value={content}
          onChange={handleChange}
          className="h-[60vh] w-[70vw]"
        />
      </animated.div>
    </>
  );
}
