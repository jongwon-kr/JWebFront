import { useParams } from "react-router-dom";
import { retrieveTodoByIdApi } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";

export function TodoComponent() {
  const { id } = useParams();

  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");

  const authContext = useAuth();

  const username = authContext.username;

  useEffect(() => retrieveTodos(), [id]);

  function retrieveTodos() {
    retrieveTodoByIdApi(username, id)
      .then((response) => {
        setDescription(response.data.description);
        setTargetDate(response.data.targetDate);
      })
      .catch((error) => console.log(error));
  }

  function onsubmit(values) {}

  return (
    <div className="container">
      <h1>Enter Todo Detaiols</h1>
      <div>
        <Formik
          initialValues={{ description, targetDate }}
          enableReinitialize={true}
          onSubmit={onsubmit}
        >
          {(props) => (
            <Form>
              <fieldset className="form-group">
                <label>Description</label>
                <Field
                  type="text"
                  className="form-control"
                  name="description"
                />
              </fieldset>
              <fieldset className="form-group">
                <label>Target Date</label>
                <Field type="date" className="form-control" name="targetDate" />
              </fieldset>
              <div>
                <button className="btn btn-success m-5" type="submit">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
