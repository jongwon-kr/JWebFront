import { useState } from "react";
import "./TodoApp.css";

export default function TodoApp() {
  return (
    <div className="App">
      <LoginComponent></LoginComponent>
    </div>
  );
}

function LoginComponent() {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setshowErrorMessage] = useState(false);

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit() {
    if (username === "jongwon" && password === "1234") {
      setShowSuccessMessage(true);
      setshowErrorMessage(false);
    } else {
      setShowSuccessMessage(false);
      setshowErrorMessage(true);
    }
  }

  function SuccessMessageComponent() {
    if (showSuccessMessage) {
      return <div className="successMessage">Authenticated Successfully</div>;
    }

    return null;
  }

  function ErrorMessageComponent() {
    if (showErrorMessage) {
      return (
        <div className="errorMEssage">
          Authentication Failed. Please check your credentials.
        </div>
      );
    }

    return null;
  }

  return (
    <div className="Login">
      <SuccessMessageComponent></SuccessMessageComponent>
      <ErrorMessageComponent></ErrorMessageComponent>
      <div className="LoginForm">
        <div className="label">
          <label>User Namne:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <button type="button" name="login" onClick={handleSubmit}>
            login
          </button>
        </div>
      </div>
    </div>
  );
}

function WelcomeComponent() {
  return <div>Welcome Component</div>;
}
