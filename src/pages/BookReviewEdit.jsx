import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../const";
import { useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const BookReviewEdit = () => {
  const [title, setTitle] = useState("");
  const [bookurl, setBookurl] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleUrlChange = (e) => setBookurl(e.target.value);
  const handleDetailChange = (e) => setDetail(e.target.value);
  const handleReviewChange = (e) => setReview(e.target.value);
	console.log(useLocation());
	const search = useLocation().pathname;
	const bookId = search.substring(6);
	console.log("bookId: ", bookId)
	const [cookies] = useCookies();
	const nav = useNavigate();
	const auth = useSelector((state) => state.auth.isSignIn);

  const deleteBookReview = () => {
		axios
			.delete(`${url}/books/${bookId}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
			.then(() => {
				nav("/")
			})
  };

	const editBookReview = () => {
		const data = {
      title: title,
      url: bookurl,
      detail: detail,
      review: review,
    };

		axios
			.put(`${url}/books/${bookId}`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
			.then(() => {
				nav("/")
			})
  };

	useEffect(() => {
		if (!auth) {
      nav("/login");
      return;
    }

		axios
      .get(`${url}/books/${bookId}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setTitle(res.data.title);
        setBookurl(res.data.url);
				setDetail(res.data.detail);
        setReview(res.data.review);
      })
      .catch((err) => {
        setErrorMessage(`${err.response.data.ErrorMessageJP}`);
      });
	}, [auth, cookies.token, bookId, nav])

  return (
    <>
      <p className="error-message">{errorMessage}</p>
      <button type="button" className="" onClick={deleteBookReview}>
        レビュー削除
      </button>
			<br />
			<br />
			<h2>書籍編集フォーム</h2>
      <form className="book-review-form">
        <label className="title-label">タイトル</label>
        <br />
        <input
          type="text"
          className="title-input"
          onChange={handleTitleChange}
          required
          placeholder="書籍タイトルを入力してください"
					value={title}
        />
        <br />
        <br />
        <label className="url-label">書籍リンク</label>
        <br />
        <input
          type="text"
          className="url-input"
          onChange={handleUrlChange}
          required
          placeholder="URLを入力してください"
					value={bookurl}
        />
        <br />
        <br />
        <label className="detail-label">説明</label>
        <br />
        <input
          type="text"
          className="url-input"
          onChange={handleDetailChange}
          required
          placeholder="書籍の説明を入力してください"
					value={detail}
        />
        <br />
        <br />
        <label className="review-label">書評</label>
        <br />
        <input
          type="text"
          className="review-input"
          onChange={handleReviewChange}
          required
          placeholder="レビューを入力してください"
					value={review}
        />
        <br />
        <br />
        <button type="button" className="" onClick={editBookReview}>
          編集
        </button>
      </form>
      <br />
    </>
  );
};
