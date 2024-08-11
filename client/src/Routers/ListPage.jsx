import axios from "axios";
import { redirect } from "react-router-dom";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../Readux/Features/ProductSlice";
import styles from "./ListPage.module.css";
import { addAuth, addUser } from "../Readux/Features/AuthSlice";
import { addUsers } from "../Readux/Features/UsersSlice";
import HistoryPageCompo from "../Components/PageComponents/HistoryPageCompo";
import ListPageCompo from "../Components/PageComponents/ListPageCompo";
import UsersPageCompo from "../Components/PageComponents/UsersPageCompo";
import StocksCompo from "../Components/PageComponents/StocksCompo";
import { addStocks } from "../Readux/Features/StockSlice";
import { addHistory } from "../Readux/Features/HistorySlice";
import listIcon from "../assets/listIcon.svg"
import historyIcon from "../assets/historyIcon.svg"
import usersIcon from "../assets/usersIcon.svg"
import stockIcon from "../assets/stockIcon.svg"
import BeatLoader from "react-spinners/BeatLoader";

export async function loader() {
  axios.defaults.withCredentials = true;
  try {
    const [materialRes, userRes, stockRes, historyRes] = await Promise.all([
      axios.get(`${import.meta.env.VITE_BASE_URL}/materials`),
      axios.get(`${import.meta.env.VITE_BASE_URL}/users`),
      axios.get(`${import.meta.env.VITE_BASE_URL}/stocks`),
      axios.get(`${import.meta.env.VITE_BASE_URL}/history`),
    ]);

    const data1 = materialRes.data;
    const resData = userRes.data;
    const stockData = stockRes.data;
    const historyData = historyRes.data

    return { data1, resData, stockData, historyData };
  } catch (error) {
    console.error("Failed to load data:", error);
    return redirect("/login");
  }
}


function ListPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data1, resData, stockData, historyData } = useLoaderData();
  
  const itemsList = useSelector((state) => state.items.item);
  const users = useSelector((state) => state.users.usersList);
  const stocks = useSelector((state) => state.stocksData.stocks);
  const user = useSelector((state) => state.authData.userData);
  const items = itemsList.filter((item) => item.status === false);
  const hisItems = useSelector((state) => state.historyData.historys)
  const [activeComponent, setActiveComponent] = useState("list");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.post("http://localhost:3000/users/verify").then((res) => {
      if (res.data.Status === "Verify-Success") {
        dispatch(addAuth(true));
        dispatch(addUser(res.data.user));
        dispatch(addItem(data1));
        dispatch(addUsers(resData));
        dispatch(addStocks(stockData));
        dispatch(addHistory(historyData));
        setLoading(false);
      } else {
        console.error("Verification failed:", res.data.Message);
        navigate("/login");
      }
    }).catch((error) => {
      console.error("API call failed:", error);
      navigate("/login");
    });
  }, [dispatch, navigate, data1, resData, stockData, historyData]);

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <BeatLoader size={25} color={"#123abc"} loading={loading} />
      </div>
    );
  }

  const handleButtonClick = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <main className={styles.mainContainer}>
      <section className={styles.bottomSection}>
      <div className={styles.bottomBtns}>
          <button
            className={`${styles.button} ${
              activeComponent === "list" ? styles.activeButton2 : ""
            }`}
            onClick={() => handleButtonClick("list")}
          >
            <img src={listIcon} alt="" /> P Order
          </button>

          <button
            className={`${styles.button} ${
              activeComponent === "stocks" ? styles.activeButton2 : ""
            }`}
            onClick={() => handleButtonClick("stocks")}
          >
            <img src={stockIcon} alt="" /> S Update
          </button>

          {user?.role === "author" && (
            <button
              className={`${styles.button} ${
                activeComponent === "users" ? styles.activeButton2 : ""
              }`}
              onClick={() => handleButtonClick("users")}
            >
              <img src={usersIcon} alt="" /> Users
            </button>
          )}

          <button
            className={`${styles.button} ${
              activeComponent === "history" ? styles.activeButton2 : ""
            }`}
            onClick={() => handleButtonClick("history")}
          >
            <img src={historyIcon} alt="" /> History
          </button>
        </div>
      </section>
      <section className={styles.sideSection}>
        <div className={styles.sideBtns}>
          <button
            className={`${styles.button} ${
              activeComponent === "list" ? styles.activeButton : ""
            }`}
            onClick={() => handleButtonClick("list")}
          >
            Purchase Order
          </button>

          <button
            className={`${styles.button} ${
              activeComponent === "stocks" ? styles.activeButton : ""
            }`}
            onClick={() => handleButtonClick("stocks")}
          >
            Stock Update
          </button>

          {user?.role === "author" && (
            <button
              className={`${styles.button} ${
                activeComponent === "users" ? styles.activeButton : ""
              }`}
              onClick={() => handleButtonClick("users")}
            >
              Users
            </button>
          )}

          <button
            className={`${styles.button} ${
              activeComponent === "history" ? styles.activeButton : ""
            }`}
            onClick={() => handleButtonClick("history")}
          >
            Purchase History
          </button>
        </div>
      </section>

      <section className={styles.contentSection}>
        {activeComponent === "list" && <ListPageCompo items={items} />}
        {activeComponent === "history" && <HistoryPageCompo hisItems={hisItems} />}
        {activeComponent === "users" && <UsersPageCompo users={users} />}
        {activeComponent === "stocks" && <StocksCompo stocks={stocks} />}
      </section>
    </main>
  );
}

export default ListPage;
