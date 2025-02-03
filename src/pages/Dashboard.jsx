import React, { useEffect, useMemo, useState } from "react";
import { Chart } from "react-charts";
import Nav from "../components/Nav";
import { useSpring, animated } from "react-spring";

let current, users, currUser;

export default function Dashboard() {
  const [userData, setUserData] = useState([0]);
  let labels = userData.map((_, index) => index + 1);

  const fadeAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(-1000px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 100, friction: 30 },
  });

  useEffect(() => {
    users = JSON.parse(localStorage.getItem("users"));
    if (localStorage.getItem("currUser")) {
      currUser = JSON.parse(localStorage.getItem("currUser"));
      current = users.find((ele) => {
        if (ele.email == currUser.email) {
          return true;
        }
        return false;
      });
      console.log(current.counterHistory);
      if (current.counterHistory) {
        setUserData(current.counterHistory);
        console.log(userData);
      }
    }
  }, []);

  const data = [
    {
      label: "Data values",
      data: userData.map((value, index) => ({
        x: labels[index],
        y: value,
      })),
    },
  ];

  const primaryAxis = useMemo(
    () => ({
      getValue: (datum) => datum.x, // get x value
      type: "linear",
    }),
    []
  );

  const secondaryAxes = useMemo(
    () => [
      {
        getValue: (datum) => datum.y, // get y value
      },
    ],
    []
  );

  return (
    <>
      <Nav now="Dashboard" />

      <br />

      <animated.div
        style={{
          width: "70%",
          height: "500px",
          margin: "auto",
          ...fadeAnimation,
        }}
      >
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
            series: {
              type: "bar",
            },
          }}
        />
      </animated.div>
      <h2 className="text-center text-2xl mb-[5vh]">Counter History</h2>

      <br />

      <div className="text-center">
        <div className="text-center">
          <h3 className=" text-gray-900">User Information</h3>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">Name</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {current && current.name}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">Email</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {current && current.email}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}
