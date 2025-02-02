import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

export default function Counter() {
  const [count,setCount]=useState(0);
  const colorLevel = count % 100; 
  const backgroundColor = `hsl(240, 100%, ${colorLevel}%)`;

  
  const animatedStyle = useSpring({
    backgroundColor,
    config: { duration: 500 }, 
  });
  return (
    <animated.div className="h-screen flex flex-col items-center justify-center" style={animatedStyle}>
      <h1 className='text-4xl text-[#00FF00]'>Counter: {count}</h1>
      <div style={{display:"flex",gap:"1vw",marginTop:"5vh"}}>
      <button className='bg-blue-600 hover:bg-blue-500 text-white p-1.5 rounded-lg' onClick={() => setCount(count + 1)}>Increment</button>
      <button className=' bg-gray-600 hover:bg-gray-500 text-white p-1.5 rounded-lg' onClick={() => setCount(0)}>Reset</button>
      <button className='bg-red-600  hover:bg-red-500 text-white p-1.5 rounded-lg' onClick={() => setCount(count - 1)}>Decrement</button>
      </div>
    </animated.div>
  );
}
