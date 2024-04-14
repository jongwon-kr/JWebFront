import { Link } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export function HeaderComponent() {
  const authContext = useAuth();
  const isAuthenticated = authContext.isAuthenticated;

  function logout() {
    authContext.logout();
  }

  return (
    <header className="border-bottom border-light border-5 mb-5 p-2 bg-navy">
      <div className="container-fluid">
        <div className="row align-items-center">
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container d-flex justify-content-between align-items-center">
              <a
                className="navbar-brand fs-2 fw-bold text-white"
                href="https://github.com/jongwon-kr"
                style={{ marginRight: "20px" }}
              >
                JWeb
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  {isAuthenticated ? (
                    <>
                      <li className="nav-item fs-5">
                        <Link
                          className="nav-link text-white"
                          to="/welcome/jongwon"
                        >
                          Home
                        </Link>
                      </li>
                      <li className="nav-item fs-5">
                        <Link className="nav-link text-white" to="/trend">
                          Hot Trend
                        </Link>
                      </li>
                      <li className="nav-item fs-5">
                        <Link className="nav-link text-white" to="/todos">
                          Todos
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item fs-5">
                        <Link className="nav-link text-white" to="/welcome/h">
                          Home
                        </Link>
                      </li>
                      <li className="nav-item fs-5">
                        <Link className="nav-link text-white" to="/trend">
                          Hot Trend
                        </Link>
                      </li>
                      <li className="nav-item fs-5">
                        <Link className="nav-link text-white" to="/login">
                          Todos
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
                <ul className="navbar-nav ms-auto">
                  {!isAuthenticated && (
                    <li className="nav-item fs-5">
                      <Link className="nav-link text-white" to="/login">
                        Login
                      </Link>
                    </li>
                  )}
                  {isAuthenticated && (
                    <li className="nav-item fs-5">
                      <Link
                        className="nav-link text-white"
                        to="/logout"
                        onClick={logout}
                      >
                        Logout
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
