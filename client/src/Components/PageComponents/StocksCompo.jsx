import { useState } from "react";
import styles from "../../Routers/Stocks.module.css";
import closeIcon from "../../assets/closeIcon.svg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addSingleStock, deleteStock } from "../../Readux/Features/StockSlice";
import toast from "react-hot-toast";
import emptyIcon from "../../assets/empty.svg";

function StocksCompo() {
  const baseURL = import.meta.env.VITE_BASE_URL
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authData.userData);
  const stocks = useSelector((state) => state.stocksData.stocks);
  const [itemForm, setItemForm] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemQty, setItemQty] = useState("");
  console.log(stocks);

  const groupedData = stocks.reduce((acc, item) => {
    acc[item.date] = acc[item.date] || [];
    acc[item.date].unshift(item);
    return acc;
  }, {});

  const handleAddItem = async (e) => {
    e.preventDefault();

    if (itemName.length < 2 || itemName.length > 15) {
      toast.error("Name must be between 2 and 15 characters long.");
      setItemName("");
      setItemQty("");
      return;
    }

    if (itemQty.length > 10) {
      toast.error("Quantity must not exceed 10 characters.");
      setItemName("");
      setItemQty("");
      return;
    }

    if (itemQty.length < 1) {
      toast.error("Quantity must be at least 1 character long.");
      setItemName("");
      setItemQty("");
      return;
    }

    try {
      const res = await axios.post(`${baseURL}/stocks`, {
        name: itemName,
        qty: itemQty,
        user: user.name,
      });
      console.log(res.data);
      setItemName("");
      setItemQty("");
      dispatch(addSingleStock(res.data));
      setItemForm(false);
      toast.success("New Item Added");
    } catch (err) {
      toast.error("Internal Server Error, Try Again");
      console.error(err);
    }
  };

  const handleRemoveItem = (itemId) => {
    try {
      dispatch(deleteStock(itemId));
      axios
        .delete(`${baseURL}/stocks/` + itemId)
        .then((res) => {
          console.log(res.data);
          toast.success("Item Removed");
        })
        .catch((err) => {
          toast.error("Internal Server Error, Try Again");
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  if (stocks.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <img src={emptyIcon} alt="" />
        <h2>Empty</h2>

        {!itemForm && (
          <div className={styles.contactBtn}>
            <button
              onClick={() => setItemForm(true)}
              className={styles.addTodoButton}
            >
              Add Item
            </button>
          </div>
        )}

        {itemForm && (
          <>
            <div className={styles.fixedOverlay}> &nbsp;</div>
            <div className={styles.fixedForm}>
              <button
                onClick={() => setItemForm(false)}
                className={styles.closeButton}
              >
                <img src={closeIcon} alt="" />
              </button>
              <form onSubmit={handleAddItem} className={styles.form}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  className={styles.inputField}
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
                <label htmlFor="qty">Qty</label>
                <input
                  type="text"
                  id="qty"
                  className={styles.inputField}
                  value={itemQty}
                  onChange={(e) => setItemQty(e.target.value)}
                />
                <button type="submit" className={styles.addButton}>
                  Add
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <main className={styles.container}>
      {itemForm && (
        <>
          <div className={styles.fixedOverlay}> &nbsp;</div>
          <div className={styles.fixedForm}>
            <button
              onClick={() => setItemForm(false)}
              className={styles.closeButton}
            >
              <img src={closeIcon} alt="" />
            </button>
            <form onSubmit={handleAddItem} className={styles.form}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className={styles.inputField}
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <label htmlFor="qty">Qty</label>
              <input
                type="text"
                id="qty"
                className={styles.inputField}
                value={itemQty}
                onChange={(e) => setItemQty(e.target.value)}
              />
              <button type="submit" className={styles.addButton}>
                Add
              </button>
            </form>
          </div>
        </>
      )}

      <div>
        {Object.entries(groupedData)
          .reverse()
          .map(([date, items]) => (
            <div key={date}>
              <div className={styles.dateHeader}>
                <span>{date}</span>
                <span>{items[0].day}</span>
              </div>
              <table className={styles.tableContainer}>
                <thead className={styles.tableHeader}>
                  <tr>
                    <th className={styles.headerNo}>No</th>
                    <th className={styles.headerName}>Name</th>
                    <th className={styles.headerQty}>Qty</th>
                    <th className={styles.headerQty}>Added By</th>
                    <th className={styles.headerActions}></th>
                  </tr>
                </thead>
                <tbody className={styles.tableBody}>
                  {items.map((item, index) => (
                    <tr key={index} className={styles.stocksTr}>
                      <td className={styles.noTh}>{index + 1}</td>
                      <td className={styles.tableName}>{item.name}</td>
                      <td>{item.qty}</td>
                      <td>{item.user}</td>
                      
                        {(user?.role === "author" ||
                          (user?.name === item.user &&
                            user?.role !== "author")) && (
                              <td className={styles.statusButtons}>
                          <div className={styles.tableBtns}>
                            <button
                              onClick={() => handleRemoveItem(item._id)}
                              className={styles.removeButton}
                            >
                              Close
                            </button>
                          </div>
                          </td>
                        )}
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
      </div>

      {!itemForm && (
        <div className={styles.contactBtn}>
          <button
            onClick={() => setItemForm(true)}
            className={styles.addTodoButton}
          >
            Add Item
          </button>
        </div>
      )}
    </main>
  );
}

export default StocksCompo;
