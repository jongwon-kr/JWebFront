import { useState } from "react";
import "./Counter.css";
import { CounterButton } from "./CounterButton";

export default function Counter() {
  const [count, setCount] = useState(0);

  function incrementCounterParent(by) {
    setCount(count + by);
  }

  function decrementCounterParent(by) {
    setCount(count - by);
  }

  function resetCounter(by) {
    setCount(0);
  }
  return (
    <div>
      <CounterButton
        by={1}
        incrementMethod={incrementCounterParent}
        decrementMethod={decrementCounterParent}
      ></CounterButton>
      <CounterButton
        by={2}
        incrementMethod={incrementCounterParent}
        decrementMethod={decrementCounterParent}
      ></CounterButton>
      <CounterButton
        by={5}
        incrementMethod={incrementCounterParent}
        decrementMethod={decrementCounterParent}
      ></CounterButton>
      <span className="TotalCount">{count}</span>
      <div>
        <button className="resetButton" onClick={resetCounter}>
          Reset
        </button>
      </div>
    </div>
  );
}
