import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

let current,users;
export default function TextEditor() {
  const [content, setContent] = useState("");

  useEffect(() => {
    users = JSON.parse(localStorage.getItem("users"));
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
  }, []);

  const handleChange = (value) => {
    setContent(value);
    const extractJsonString = content.replace(/<[^>]*>/g, '');
        users=users.map((ele)=>{
            if(ele.email==current.email){
                ele.userData=JSON.parse(extractJsonString);
                return ele;
            }
        })
        localStorage.setItem("users", JSON.stringify(users));
  };

    // useEffect(()=>{
    //     const extractJsonString = content.replace(/<[^>]*>/g, '');
    //     console.log(JSON.parse(extractJsonString))
    //     users=users.map((ele)=>{
    //         if(ele.email==current.email){
    //             ele.userData=JSON.parse(extractJsonString);
    //             return ele;
    //         }
    //     })
    //     console.log(users);
    //     localStorage.setItem("users", JSON.stringify(users));
    // },[content])

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-2">
      <h2>Text Editor</h2>
      <ReactQuill
        value={content}
        onChange={handleChange}
        className="h-[70vh] w-[70vw]"
      />
    </div>
  );
}
