import React, { useState, useContext } from "react";
import { LOGIN_API } from "./../config/ajax-path";
import ThemeContext from "./ThemeContext";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const [myForm, setMyForm] = useState({
        account: "",
        password: "",
    });

    const themeContext = useContext(ThemeContext);
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const changeFields = (event) => {
        const id = event.target.id;
        const val = event.target.value;
        console.log({ id, val });

        setMyForm({ ...myForm, [id]: val });
    };

    const whenSubmit = (event) => {
        event.preventDefault();

        console.log(myForm);
        // TODO: 表單檢查
        fetch(LOGIN_API, {
            method: "POST",
            body: JSON.stringify(myForm),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((r) => r.json())
            .then((result) => {
                console.log(result);
                if (result.success) {
                    localStorage.setItem("auth", JSON.stringify(result.data));
                    // 這邊是把登入寫入localStorage
                    setAuth({
                        ...result.data,
                        authorized: true,
                    });
                    navigate("/");
                } else {
                    alert("帳密錯誤");
                }
            });
    };

    return (
        <div
            className="container"
            style={{
                backgroundColor: themeContext.bgc,
                color: themeContext.fc,
            }}
        >
            <div className="row">
                <div className="col-lg-6">
                    <form name="form1" onSubmit={whenSubmit}>
                        <div className="mb-3">
                            <label htmlFor="account" className="form-label">
                                Account
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="account"
                                name="account"
                                value={myForm.account}
                                onChange={changeFields}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={myForm.password}
                                onChange={changeFields}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
