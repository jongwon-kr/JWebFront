import { useState } from "react";
import PropTypes from "prop-types";

export function CounterButton({ by, incrementMethod, decrementMethod }) {
  const [count, setCount] = useState(0);

  function incrementCounter() {
    setCount(count + by);
    incrementMethod(by);
  }

  function decrementCounter() {
    setCount(count - by);
    decrementMethod(by);
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
