import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Header } from "../components/Header";
import { url } from "../const";

export const Home = () => {
  const [listThread, setListThread] = useState([{}]);
  const [cookies] = useCookies();

  useEffect(() => {
    fetch(url + "/books", {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => res.json())
      .then((data) => {
        setListThread(data);
      });
  }, [cookies.token]);

  return (
    <div className="App">
      <Header />
      <main>
        <ul>
          {listThread.map((thread) => (
            <li key={String(thread.id)}>{thread.title}</li>
          ))}
        </ul>
      </main>
    </div>
  );
};
