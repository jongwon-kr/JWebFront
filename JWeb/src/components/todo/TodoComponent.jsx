import { useNavigate, useParams } from "react-router-dom";
import {
  createTodoApi,
  retrieveTodoByIdApi,
  updateTodoApi,
} from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import moment from "moment";

export function TodoComponent() {
  const { id } = useParams();
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");

  const authContext = useAuth();
  const navigate = useNavigate();

  const username = authContext.username;

  useEffect(() => retrieveTodos(), [id]);

  function retrieveTodos() {
    if (id != -1) {
      retrieveTodoByIdApi(username, id)
        .then((response) => {
          setDescription(response.data.description);
          setTargetDate(response.data.targetDate);
        })
        .catch((error) => console.log(error));
    }
  }

  function onsubmit(values) {
    const todo = {
      id: id,
      username: username,
      description: values.description,
      targetDate: values.targetDate,
      done: false,
    };

    console.log(todo);
    if (id == -1) {
      createTodoApi(username, todo)
        .then((response) => {
          navigate("/todos");
        })
        .catch((error) => console.log(error));
    } else {
      updateTodoApi(username, id, todo)
        .then((response) => {
          navigate("/todos");
        })
        .catch((error) => console.log(error));
    }
  }

  function validate(values) {
    let errors = {};

    if (values.description.length < 5) {
      errors.description = "글자가 너무 적어요(5글자이상)";
    }

    if (
      values.targetDate == null ||
      values.targetDate == "" ||
      !moment(values.targetDate).isValid
    ) {
      errors.targetDate = "작성 날짜를 입력해주세요.";
    }

    console.log(values);
    return errors;
  }

  return (
    <div className="container">
      <h1 style={{ fontWeight: "bold" }}>할 일과 날짜를 입력해주세요</h1>
      <div>
        <Formik
          initialValues={{ description, targetDate }}
          enableReinitialize={true}
          onSubmit={onsubmit}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(props) => (
            <Form>
              <ErrorMessage
                name="description"
                component="div"
                className="alert alert-warning font-weight-bold"
              ></ErrorMessage>
              <ErrorMessage
                name="targetDate"
                component="div"
                className="alert alert-warning font-weight-bold"
              ></ErrorMessage>
              <fieldset className="form-group">
                <label className="font-weight-bold">할 일</label>
                <Field
                  type="text"
                  className="form-control"
                  name="description"
                />
              </fieldset>
              <fieldset className="form-group">
                <label className="font-weight-bold">작성 날짜</label>
                <Field type="date" className="form-control" name="targetDate" />
              </fieldset>
              <div>
                <button className="btn btn-success m-5" type="submit">
                  저장
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
