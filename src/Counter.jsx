import React, { useState, useEffect } from "react";
import moment from "moment";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [lastIncrementDate, setLastIncrementDate] = useState(null);

  useEffect(() => {
    const lastDate = localStorage.getItem("lastIncrementDate");
    if (lastDate) {
      const lastIncrementMoment = moment(lastDate);
      const today = moment();
      if (!today.isSame(lastIncrementMoment, "day")) {
        // Reset the count if a day has passed
        setCount(0);
        setLastIncrementDate(null);
        localStorage.removeItem("lastIncrementDate");
      } else {
        setLastIncrementDate(lastIncrementMoment);
        setCount(parseInt(localStorage.getItem("count")) || 0);
      }
    }
  }, []);

  const handleIncrement = () => {
    const today = moment();
    if (!lastIncrementDate || !today.isSame(lastIncrementDate, "day")) {
      setCount(1);
    } else {
      setCount(count + 1);
    }
    setLastIncrementDate(today);
    localStorage.setItem("lastIncrementDate", today.format());
    localStorage.setItem("count", count + 1);
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50vh",
        transform: "translateY(-50%)",
      }}
    >
      <h1>{count}</h1>
      <button
        onClick={handleIncrement}
        disabled={
          lastIncrementDate && moment().isSame(lastIncrementDate, "day")
        }
      >
        Increment
      </button>
    </div>
  );
};

export default Counter;
