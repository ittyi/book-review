import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../const";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

export const BookReviewDetail = () => {
  const [title, setTitle] = useState("");
  const [bookurl, setBookurl] = useState("");
  const [review, setReview] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  const auth = useSelector((state) => state.auth.isSignIn);
  const nav = useNavigate();
  const [cookies] = useCookies();
  const { id } = useParams();

  useEffect(() => {
    if (!auth) {
      nav("/login");
      return;
    }
	setLoading(true);

    axios
      .get(`${url}/books/${id}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setTitle(res.data.title);
        setBookurl(res.data.url);
        setReview(res.data.review);
		setLoading(false);
      })
      .catch((err) => {
        setErrorMessage(`${err.response.data.ErrorMessageJP}`);
      });
  }, [auth, cookies.token, nav, id]);

  return (
    <div>
      {loading && <p>loading...</p>}
      <p className="error-message">{errorMessage}</p>
      <br />
      {title}
      <br />
      {bookurl}
      <br />
      {review}
    </div>
  );
};
