import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { signIn } from "../authSlice";
import { url } from "../const";
import Compressor from "compressorjs";

export function Signup() {
  const nav = useNavigate();
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessge] = useState();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [icon, setIcon] = useState();

  // 一旦無理やり使う
  console.log(cookies);
  console.log(typeof removeCookie);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleIcon = (e) => setIcon(e.target.files[0]);
  const onSignUp = () => {
    const data = {
      email: email,
      name: name,
      password: password,
    };

    const req = `${url}/users`;
    axios
      .post(req, data)
      .then((res) => {
        const token = res.data.token;
        dispatch(signIn());
        setCookie("token", token);

        new Compressor(icon, {
          quality: 0.6,
          success(result) {

            const imageReq = `${url}/uploads`;
            let formData = new FormData()
            formData.append('icon', result);
            console.log("formData: ", formData);
            axios
              .post(imageReq, formData, {
                headers: {
                  "content-type": "multipart/form-data",
                  authorization: `Bearer ${res.data.token}`,
                },
              })
              .then((response) => {
                console.log(response);
                nav("/");
              });
          },
          maxWidth: 1000,
          maxHeight: 400,
          mimeType: "image/png",
        });
      })
      .catch((err) => {
        setErrorMessge(`サインアップに失敗しました。 ${err}`);
      });

    if (auth) return <Navigate to="/" />;
  };

  return (
    <div>
      <main className="signup">
        <h2>新規作成</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="signup-form">
          <label>メールアドレス</label>
          <br />
          <input
            type="email"
            onChange={handleEmailChange}
            className="email-input"
          />
          <br />
          <label>ユーザ名</label>
          <br />
          <input
            type="text"
            onChange={handleNameChange}
            className="name-input"
          />
          <br />
          <label>パスワード</label>
          <br />
          <input
            type="password"
            onChange={handlePasswordChange}
            className="password-input"
          />
          <br />
          <input type="file" id="file" accept="image/*" onChange={handleIcon} />
          <br />
          <button type="button" onClick={onSignUp} className="signup-button">
            作成
          </button>
        </form>
      </main>
    </div>
  );
}
