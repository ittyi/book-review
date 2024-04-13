import React, { useState } from "react";
import axios from "axios";
import { url } from "../const";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

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
          `サインインに失敗しました。${err.response.data.ErrorMessageJP}`
        );
      });
	};
  return (
    <>
      test
			<p className="error-message">{errorMessage}</p>
      <form className="edit-profile-form">
        <label className="">ユーザーネーム</label>
        <br />
        <input type="text" onChange={handleProfileChange} required />
        <br />
        <button type="button" className="" onClick={onEditProfile}>
          編集
        </button>
      </form>
    </>
  );
};
