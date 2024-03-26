import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

export function LoginComponent() {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [showErrorMessage, setshowErrorMessage] = useState(false);

  const navigate = useNavigate();

  const authContext = useAuth();

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit() {
    if (authContext.login(username, password)) {
      navigate(`/welcome/${username}`);
    } else {
      setshowErrorMessage(true);
    }
  }

  return (
    <div className="Login">
      <h1>To Login!</h1>
      {showErrorMessage && (
        <div className="errorMEssage">
          Authentication Failed. Please check your credentials.
        </div>
      )}
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
