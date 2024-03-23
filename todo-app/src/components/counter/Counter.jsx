import { useState } from "react";
import PropTypes from "prop-types";
import "./Counter.css";

export default function Counter() {
  const [count, setCount] = useState(0);

  function incrementCounterParent(by) {
    setCount(count + by);
  }

  return (
    <div>
      <span className="TotalCount">{count}</span>
      <CounterButton
        by={1}
        someMethodInParent={incrementCounterParent}
      ></CounterButton>
      <CounterButton
        by={2}
        someMethodInParent={incrementCounterParent}
      ></CounterButton>
      <CounterButton
        by={5}
        someMethodInParent={incrementCounterParent}
      ></CounterButton>
    </div>
  );
}

function CounterButton({ by, incrementCounterParent }) {
  const [count, setCount] = useState(0);

  function incrementCounter() {
    setCount(count + by);
    incrementCounterParent();
  }

  function decrementCounter() {
    setCount(count - by);
    incrementCounterParent();
  }

  return (
    <div className="Counter">
      <div>
        <button className="counterButton" onClick={incrementCounter}>
          +{by}
        </button>
        <button className="counterButton" onClick={decrementCounter}>
          -{by}
        </button>
      </div>
    </div>
  );
}

CounterButton.propTypes = {
  by: PropTypes.number,
};
