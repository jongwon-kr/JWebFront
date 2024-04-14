import { useState, useEffect } from "react";
import {
  retrieveAllTodosForUsernameApi,
  deleteTodoByIdApi,
  updateTodoApi,
} from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

export function ListTodosComponent() {
  const [todos, setTodos] = useState([]);
  const authContext = useAuth();
  const username = authContext.username;
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    refreshTodos();
  }, []);

  function refreshTodos() {
    retrieveAllTodosForUsernameApi(username)
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => console.log(error));
  }

  function deleteTodo(id, description) {
    deleteTodoByIdApi(username, id)
      .then(() => {
        setMessage(`${description} 완료`);
        refreshTodos();
        setTimeout(() => {
          setMessage(null); // 메시지를 null로 업데이트하여 메시지가 사라지게 함
        }, 2000); // 2초 후에 실행
      })
      .catch((error) => console.log(error));
  }

  function updateTodo(id) {
    navigate(`/todo/${id}`);
  }

  function addNewTodo() {
    navigate("/todo/-1");
  }

  return (
    <div className="container">
      <h1>Todo List</h1>
      {message && (
        <div className="message-container">
          <div className="alert alert-warning message">{message}</div>
        </div>
      )}
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>할 일</th>
              <th>실천</th>
              <th>등록 시간</th>
              <th>삭제/수정</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.description}</td>
                <td>{todo.done ? "O" : "X"}</td>
                <td>{todo.targetDate.toString()}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(todo.id, todo.description)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-primary ms-2"
                    onClick={() => updateTodo(todo.id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="btn btn-primary m-3" onClick={addNewTodo}>
        할 일 추가
      </div>
    </div>
  );
}
