import { useState } from "react";
import PropTypes from "prop-types";
import "./Counter.css";

export default function Counter() {
  function incrementCounterParent(by) {
    setCount(count + by);
  }

  function someMethodInParent() {
    console.log("parent method called");
  }

  return (
    <div>
      <span className="TotalCount">{count}</span>
      <CounterButton
        by={1}
        someMethodInParent={someMethodInParent}
      ></CounterButton>
      <CounterButton
        by={2}
        someMethodInParent={someMethodInParent}
      ></CounterButton>
      <CounterButton
        by={5}
        someMethodInParent={someMethodInParent}
      ></CounterButton>
    </div>
  );
}

function CounterButton({ by, someMethodInParent }) {
  const [count, setCount] = useState(0);

  function incrementCounter() {
    setCount(count + by);
    someMethodInParent();
    console.log(count);
  }

  function decrementCounter() {
    setCount(count - by);
    someMethodInParent();
    console.log(count);
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
