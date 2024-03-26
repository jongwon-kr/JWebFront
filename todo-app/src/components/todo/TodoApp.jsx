import "./TodoApp.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { LogoutComponent } from "./LogoutComponent";
import { FooterComponent } from "./FooterComponent";
import { HeaderComponent } from "./HeaderComponent";
import { ListTodosComponent } from "./ListTodosComponent";
import { ErrorComponent } from "./ErrorComponent";
import { WelcomeComponent } from "./WelcomeComponent";
import { LoginComponent } from "./LoginComponent";
import { AuthProvider, useAuth } from "./security/AuthContext";

function AuthenticatedRoute({ children }) {
  const authContext = useAuth();
  if (authContext.isAuthenticated) return children;
  return <Navigate to={"/"}></Navigate>;
}

export default function TodoApp() {
  return (
    <div className="TodoApp">
      <AuthProvider>
        <BrowserRouter>
          <HeaderComponent />
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route
              path="/welcome/:username"
              element={
                <AuthenticatedRoute>
                  <WelcomeComponent />
                </AuthenticatedRoute>
              }
            />
            <Route path="*" element={<ErrorComponent />} />
            <Route
              path="/todos"
              element={
                <AuthenticatedRoute>
                  <ListTodosComponent />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/logout"
              element={
                <AuthenticatedRoute>
                  <LogoutComponent />
                </AuthenticatedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
        <FooterComponent />
      </AuthProvider>
    </div>
  );
}
