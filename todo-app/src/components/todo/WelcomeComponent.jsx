import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { retrieveHelloWorldPathVariable } from "./api/HelloWorldApiService";
import { useAuth } from "./security/AuthContext";

export function WelcomeComponent() {
  const { username } = useParams();

  const authContext = useAuth();

  const [message, setMessage] = useState(null);

  function callHelloWorldRestApi() {
    console.log("called");
    retrieveHelloWorldPathVariable("jongwon", authContext.token)
      .then((response) => successfulResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log("cleanup"));
  }

  function successfulResponse(response) {
    console.log(response);
    // setMessage(response.data);
    setMessage(response.data.message);
  }

  function errorResponse(response) {
    console.log(response);
  }
  return (
    <div className="WelcomeComponent">
      <h1>Welcome {username}</h1>
      <div>
        Manage Your todos. <Link to="/todos">Go here</Link>
      </div>
      <div>
        <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>
          Call Hello World REST API
        </button>
      </div>
      <div className="test-info">{message}</div>
    </div>
  );
}
