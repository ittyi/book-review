import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { EditProfile } from "./pages/EditProfile";
import { PostBookReview } from "./pages/PostBookReview";
import { BookReviewDetail } from "./pages/BookReviewDetail";

import { Provider } from "react-redux";
import { store } from "./store";
import { CookiesProvider } from "react-cookie";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <EditProfile />,
  },
  {
    path: "/new",
    element: <PostBookReview />,
  },
  {
    path: "/detail/:id",
    element: <BookReviewDetail />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <RouterProvider router={router} />
      </CookiesProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
