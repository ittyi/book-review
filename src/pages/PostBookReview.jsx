import React, { useState } from "react";
import axios from "axios";
import { url } from "../const";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const PostBookReview = () => {
	const [title, setTitle] = useState("");
	const [bookurl, setBookurl] = useState("");
	const [detail, setDetail] = useState("");
	const [review, setReview] = useState("");
	const [errorMessage, setErrorMessage] = useState();

	const handleTitleChange = (e) => setTitle(e.target.value);
	const handleUrlChange = (e) => setBookurl(e.target.value);
	const handleDetailChange = (e) => setDetail(e.target.value);
	const handleReviewChange = (e) => setReview(e.target.value);

	const [cookies] = useCookies();
	const nav = useNavigate();

	const onPostBookReview = () => {
		const data = {
      title: title,
      url: bookurl,
      detail: detail,
      review: review,
    };

		axios
      .post(`${url}/books`, data, {
				headers: {
					authorization: `Bearer ${cookies.token}`,
				},
			})
      .then((res) => {
				console.log(res);
        nav("/");
      })
      .catch((err) => {
        setErrorMessage(
          `${err.response.data.ErrorMessageJP}`
        );
      });
	}

  return (
    <>
			<p className="error-message">{errorMessage}</p>
      <form className="book-review-form">
        <label className="title-label">タイトル</label>
        <br />
        <input
          type="text"
          className="title-input"
          onChange={handleTitleChange}
          required
					placeholder="書籍タイトルを入力してください"
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
        />
        <br />
				<br />
        <label className="review-label">書評</label>
        <br />
        <input
          type="text"
          className="url-input"
          onChange={handleReviewChange}
          required
					placeholder="レビューを入力してください"
        />
        <br />
				<br />
				<button type="button" className="" onClick={onPostBookReview}>
          登録
        </button>
      </form>
    </>
  );
};
