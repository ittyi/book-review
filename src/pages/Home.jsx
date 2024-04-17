import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Header } from "../components/Header";
import { Pagination } from "../components/Pagination";
import { url } from "../const";
import "./book-list.scss";
import "./main.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

export const Home = () => {
  const storeOffset = useSelector((state) => state.pagination.offset);
  const auth = useSelector((state) => state.auth.isSignIn);
  const [listBook, setListBook] = useState([]);
  const [cookies] = useCookies();
  const nav = useNavigate();

  useEffect(() => {
    if (!auth) {
      fetch(`${url}/public/books?offset=${storeOffset}`)
        .then((res) => res.json())
        .then((data) => {
          setListBook(data);
        });
      return;
    }

    fetch(`${url}/books?offset=${storeOffset}`, {
      headers: {
        authorization: `Bearer ${cookies.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setListBook(data);
      });
  }, [cookies.token, storeOffset, auth]);

  const handlePostBookReview = () => {
    nav("/new")
  }

  const createLogByAccessBookReviewDetails = (bookId) => {
    const data = {
      selectBookId: bookId,
    };

    axios
    .post(`${url}/logs`, data, {
      headers: {
        authorization: `Bearer ${cookies.token}`,
      },
    })
      .then((res) => {
        console.log(res)
      })
  }

  return (
    <div className="App">
      <Header />
      <main className="main">
        <div className="book-list">
          <h2 className="book-list__heading">書籍 一覧</h2>
          <div>
            <button onClick={handlePostBookReview}>
              書籍登録
            </button>
          </div>
          <ul className="book-list__content">
            {listBook.map((book) => (
              <li key={String(book.id)} className="book-list__book-title">
                <Link to={`/detail/${book.id}`} state={book.title} onClick={() => createLogByAccessBookReviewDetails(book.id)}>
                  {book.title}
                </Link>
              </li>
            ))}
          </ul>
          <Pagination />
        </div>
      </main>
    </div>
  );
};
