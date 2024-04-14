import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Header } from "../components/Header";
import { Pagination } from "../components/Pagination";
import { url } from "../const";
import "./book-list.scss";
import "./main.scss";
import { useSelector } from "react-redux";

export const Home = () => {
  const storeOffset = useSelector((state) => state.pagination.offset);
  const auth = useSelector((state) => state.auth.isSignIn);
  const [listBook, setListBook] = useState([]);
  const [cookies] = useCookies();

  useEffect(() => {
    if (!auth) {
      fetch(`${url}/public/books?offset=${storeOffset}`, {})
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
      params: {
        offset: storeOffset,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setListBook(data);
      });
  }, [cookies.token, storeOffset]);

  return (
    <div className="App">
      <Header />
      <main className="main">
        <div className="book-list">
          <h2 className="book-list__heading">書籍 一覧</h2>
          <ul className="book-list__content">
            {listBook.map((book) => (
              <li key={String(book.id)} className="book-list__book-title">
                {book.title}
              </li>
            ))}
          </ul>
          <Pagination />
        </div>
      </main>
    </div>
  );
};
