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
import { TodoComponent } from "./TodoComponent";
import { ListTrendsComponent } from "./ListTrendComponent";

function AuthenticatedRoute({ children }) {
  const authContext = useAuth();
  if (authContext.isAuthenticated) return children;
  <Navigate to={"/"}></Navigate>;
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
            <Route path="/welcome/:username" element={<WelcomeComponent />} />
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
              path="/todo/:id"
              element={
                <AuthenticatedRoute>
                  <TodoComponent></TodoComponent>
                </AuthenticatedRoute>
              }
            />
            <Route path="/logout" element={<LogoutComponent />} />
            <Route
              path="/trend"
              element={<ListTrendsComponent></ListTrendsComponent>}
            />
          </Routes>
        </BrowserRouter>
        <FooterComponent />
      </AuthProvider>
    </div>
  );
}
