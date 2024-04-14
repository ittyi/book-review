import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../authSlice";
import axios from "axios";
import { url } from "../const";
import "./header.scss";

export const Header = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const handleSignOut = () => {
    dispatch(signOut());
    removeCookie("token");
    nav("/login");
  };

  const handleLogin = () => {
    nav("/login");
  };

  const [icon, setIcon] = useState();

  useEffect(() => {
    if (!auth) {
      return
    }

    axios
      .get(`${url}/users`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setIcon(res.data.iconUrl);
      });
  }, [cookies.token, auth, nav]);
  // 一旦無理やり使う
  console.log(cookies);
  console.log(typeof setCookie);

  return (
    <header className="header">
      <h1 className="header__heading">書籍レビュー</h1>
      <div className="header__nav">
        {auth ? (
          <>
            <p className="header__icon">
              <img src={icon} alt="User Icon" width="50" height="50" />
            </p>
            <button onClick={handleSignOut} className="header__btn">
              サインアウト
            </button>
          </>
        ) : (
          <>
            <button onClick={handleLogin} className="header__btn">
              ログイン
            </button>
          </>
        )}
      </div>
    </header>
  );
};
