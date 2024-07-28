import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./Readux/Store.jsx";
import { Provider } from "react-redux";
import ListPage, { loader as listLoader } from "./Routers/ListPage.jsx";
import RootRouter from "./Routers/RootRouter.jsx";
import ErrorPage from "./ErrorPage.jsx";
import HistoryPage, { loader as hisLoader } from "./Routers/HistoryPage.jsx";
import LoginPage from "./Routers/LoginPage.jsx";
import ProfilePage, {loader as ProfileLoader} from "./Routers/ProfilePage.jsx";
import Stocks, {loader as StocksLoader} from "./Routers/Stocks.jsx";
import StockDetails, {loader as StocksDetailsLoader} from "./Routers/StocksDetails.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRouter />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <ListPage />,
        loader: listLoader,
      },
      {
        path: "/history",
        element: <HistoryPage />,
        loader: hisLoader,
      },
      {
        path: "/login",
        element: <LoginPage/>,
      },
      {
        path: "/profile",
        element: <ProfilePage/>,
        loader: ProfileLoader,
      },
      {
        path: "/stocks",
        element:<Stocks/>,
        loader: StocksLoader
      },
      {
        path: "/stocks/:itemId",
        element:<StockDetails/>,
        loader: StocksDetailsLoader
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
