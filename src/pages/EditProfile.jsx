import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../const";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Header } from "../components/Header";
import { useSelector } from "react-redux";

export const EditProfile = () => {
	const [name, setName] = useState("");
	const nav = useNavigate();
	const [errorMessage, setErrorMessage] = useState();
	const [cookies] = useCookies();

  const handleProfileChange = (e) => setName(e.target.value);

  const onEditProfile = () => {
		const data = {
      "name": name,
    };

		axios
      .put(`${url}/users`, data, {
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
	};

	const auth = useSelector((state) => state.auth.isSignIn);
	useEffect(() => {
    if (!auth) {
			nav("/login")
      return;
    }
		
		axios
      .get(`${url}/users`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setName(res.data.name);
      });
  }, [auth, nav, cookies.token]);

  return (
    <>
			<Header />
			<p className="error-message">{errorMessage}</p>
      <form className="edit-profile-form">
        <label className="">ユーザーネーム</label>
        <br />
        <input 
					type="text" 
					onChange={handleProfileChange} 
					value={name}
					required 
				/>
        <br />
        <button type="button" className="" onClick={onEditProfile}>
          編集
        </button>
      </form>
    </>
  );
};
