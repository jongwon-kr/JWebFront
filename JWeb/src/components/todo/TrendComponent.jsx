import { useNavigate, useParams } from "react-router-dom";
import { retrieveTodayAllTrendsApi } from "./api/TrendApiService";
import { useAuth } from "./security/AuthContext";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import moment from "moment";

export function TrendComponent() {
  const { id } = useParams();
  const [seq, setSeq] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [article, setArticle] = useState("");
  const [agoTime, setAgoTime] = useState("");
  const [volume, setVolume] = useState("");
  const [date, setDate] = useState("");
  const [articleLink, setArticleLink] = useState("");
  const [imgLink, setImgLink] = useState("");

  const authContext = useAuth();
  const navigate = useNavigate();

  const username = authContext.username;
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  useEffect(() => retrievetrends(), [id]);

  function retrievetrends() {
    if (id != -1) {
      retrieveTodayAllTrendsApi(formattedDate)
        .then((response) => {
          setSeq(response.data.seq);
          setKeyword(response.data.keyword);
          setArticle(response.data.article);
          setAgoTime(response.data.agoTime);
          setVolume(response.data.volume);
          setDate(response.data.date);
          setArticleLink(response.data.articleLink);
          setImgLink(response.data.imgLink);
        })
        .catch((error) => console.log(error));
    }
  }

  function onsubmit(values) {
    const trend = {
      seq: values.seq,
      keyword: values.keyword,
      article: values.article,
      agoTime: values.agoTime,
      volume: values.volume,
      date: values.date,
      articleLink: values.articleLink,
      imgLink: values.imgLink,
    };
    console.log(trend);
  }

  return (
    <div className="container">
      <h1>Enter trend Detaiols</h1>
      <div>
        <Formik
          initialValues={{ description, targetDate }}
          enableReinitialize={true}
          onSubmit={onsubmit}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(props) => (
            <Form>
              <ErrorMessage
                name="description"
                component="div"
                className="alert alert-warning"
              ></ErrorMessage>
              <ErrorMessage
                name="targetDate"
                component="div"
                className="alert alert-warning"
              ></ErrorMessage>
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
