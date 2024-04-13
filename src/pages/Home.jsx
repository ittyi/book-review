import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Header } from "../components/Header";
import { url } from "../const";
import "./book-list.scss";
import "./main.scss";
import { useSelector, useDispatch } from "react-redux";
import { returnToTop, back, next } from "../paginationReducer";

export const Home = () => {
  const dispatch = useDispatch();
  const storeOffset = useSelector((state) => state.pagination.offset);
  const [listBook, setListBook] = useState([]);
  const [cookies] = useCookies();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetch(`${url}/books?offset=${storeOffset}`, {
      headers: {
        authorization: `Bearer ${cookies.token}`,
      },
      params: {
        offset: storeOffset,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setListBook(data);
      });
  }, [cookies.token, storeOffset]);

  const resetOffset = () => {
    dispatch(returnToTop());
  }

  const backOffset = () => {
    dispatch(back());
  }

  const nextOffset = () => {
    dispatch(next());
  }

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
          <button
            onClick={resetOffset}
          >
            最初へ戻る
          </button>
          <button
            onClick={backOffset}
          >
            1つ前に戻る
          </button>
          <button
            onClick={nextOffset}
          >
            次へ
          </button>
        </div>
      </main>
    </div>
  );
};
