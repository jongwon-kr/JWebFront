import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
import "./LoginComponent.css"; // 새로운 CSS 파일 추가

export function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false); // 변수 이름 수정

  const navigate = useNavigate();
  const authContext = useAuth();

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit() {
    if (await authContext.login(username, password)) {
      navigate(`/welcome/${username}`);
    } else {
      setShowErrorMessage(true); // 변수 이름 수정
    }
  }

  return (
    <div className="Login">
      <h1>로그인</h1>
      {showErrorMessage && (
        <div className="errorMessage">
          로그인 실패! 아이디, 패스워드를 확인해주세요
        </div>
      )}
      <div className="LoginForm">
        <div className="formGroup">
          <label htmlFor="username">ID</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="formGroup">
          <button type="button" name="login" onClick={handleSubmit}>
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}
