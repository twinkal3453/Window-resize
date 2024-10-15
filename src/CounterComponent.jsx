import React, { memo } from "react";

const CounterComponent = ({ count }) => {
  console.log("Line 4 CounterComponent called!");
  return <div>CounterComponent: {count}</div>;
};

export default memo(CounterComponent);
