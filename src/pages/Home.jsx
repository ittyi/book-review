import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Header } from "../components/Header";
import { url } from "../const";
import "./book-list.scss";
import "./main.scss";

export const Home = () => {
  const [listBook, setListBook] = useState([{}]);
  const [cookies] = useCookies();

  useEffect(() => {
    fetch(url + "/books", {
      headers: {
        authorization: `Bearer ${cookies.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setListBook(data);
      });
  }, [cookies.token]);

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
        </div>
      </main>
    </div>
  );
};
