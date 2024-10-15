import React, { useMemo, useState } from "react";
import CounterComponent from "./CounterComponent";

const Counter = () => {
  const [counterState, setCounterState] = useState(0);
  const [stateCounter, setStateCounter] = useState(0);

  const expensiveCalculation = (num) => {
    console.log("Calculating...");
    for (let i = 0; i < 1000000000; i++) {
      num += 1;
    }
    return num;
  };

  // Extensive Calculation
  const calculation = useMemo(
    () => expensiveCalculation(counterState),
    [counterState]
  );

  return (
    <div>
      <h2>CounterState: {calculation}</h2>
      <button onClick={() => setCounterState(counterState + 1)}>counter</button>
      <button onClick={() => setStateCounter(stateCounter + 1)}>
        StateCounter
      </button>
      <CounterComponent count={stateCounter} />
    </div>
  );
};

export default Counter;
