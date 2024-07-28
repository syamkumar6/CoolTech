import { useEffect, useState } from "react";
import styles from "../../Routers/ListPage.module.css";
import closeIcon from "../../assets/closeIcon.svg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addSingleItem, deleteItem } from "../../Readux/Features/ProductSlice";
import toast from "react-hot-toast";
import { updateStock } from "../../Readux/Features/StockSlice";
import { addSingleHistory } from "../../Readux/Features/HistorySlice";
import emptyIcon from "../../assets/empty.svg";
import PulseLoader from "react-spinners/PulseLoader";


function ListPageCompo({ items }) {
  const baseURL = import.meta.env.VITE_BASE_URL
  const dispatch = useDispatch();
  const [itemForm, setItemForm] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemQty, setItemQty] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const user = useSelector((state) => state.authData.userData);
  const [spinner, setSpinner] = useState(false) 
  const stocks = useSelector((state) => state.stocksData.stocks);

  const groupedData = items.reduce((acc, item) => {
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
    
    try {
      setSpinner(true)
      const res = await axios.post(`${baseURL}/materials`, {
        name: itemName,
        qty: itemQty,
        author: user?.name,
      });
      console.log(res.data);
      setItemName("");
      setItemQty("");
      dispatch(addSingleItem(res.data));
      setItemForm(false);
      setSpinner(false)
      toast.success("Item Added");
    } catch (err) {
      console.error(err);
    }
  };

  const itemNames = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
    "Honeydew",
    "Kiwi",
    "Lemon",
    // ... other item names
  ];

  const handleNameChange = (e) => {
    const input = e.target.value;
    setItemName(input);

    if (input.length > 0) {
      const filteredSuggestions = itemNames.filter((name) =>
        name.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setItemName(suggestion);
    setSuggestions([]);
  };

  const handleRemoveItem = async (itemId) => {
    try {
      dispatch(deleteItem(itemId));
      await axios
        .delete(`${baseURL}/materials/` + itemId)
        .then(() => {
          toast.success("Item Removed ");
          console.log("Item Removed");
        })
        .catch((err) => {
          toast.error("Internal Server Error");
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateHistory = async (item) => {
    try {
      console.log(item);
      const res = await axios.post(`${baseURL}/history`, item);
      console.log(res.data);
      toast.success("Item Added to History ");
      dispatch(addSingleHistory(res.data));
      handleRemoveItem(item._id);
    } catch (err) {
      toast.error("Internal Server Error");
      console.log(err);
    }
  };
  console.log("Grouped Data:", groupedData);

  if (items.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <img src={emptyIcon} alt="" />
        <h2>Empty</h2>
        {!itemForm && (
          <div className={styles.contactBtn}>
            <button
              onClick={() => {
                setItemForm(true);
              }}
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
                onClick={() => {
                  setItemForm(false);
                }}
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
                  onChange={handleNameChange}
                />
                {suggestions.length > 0 && (
                  <ul className={styles.suggestionsList}>
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className={styles.suggestionItem}
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
                <label htmlFor="qty">Qty</label>
                <input
                  type="text"
                  id="qty"
                  className={styles.inputField}
                  value={itemQty}
                  onChange={(e) => setItemQty(e.target.value)}
                />
                <button type="submit" className={styles.addButton}>
                  {spinner === true ? <PulseLoader size={15} color={"#fff"} />
                  : "Add"}
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
              onClick={() => {
                setItemForm(false);
              }}
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
                onChange={handleNameChange}
              />
              {suggestions.length > 0 && (
                <ul className={styles.suggestionsList}>
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className={styles.suggestionItem}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
              <label htmlFor="qty">Qty</label>
              <input
                type="text"
                id="qty"
                className={styles.inputField}
                value={itemQty}
                onChange={(e) => setItemQty(e.target.value)}
              />
              <button type="submit" className={styles.addButton}>
              {spinner === true ? <PulseLoader size={15} color={"white"}/>
                  : "Add"}
              </button>
            </form>
          </div>
        </>
      )}

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
                    <td>{item.author}</td>
                    <td className={styles.statusButtons}>
                      {user?.role === "author" && (
                        <div className={styles.tableBtns}>
                          <button
                            onClick={() => handleUpdateHistory(item)}
                            className={styles.cmdButton}
                          >
                            Close
                          </button>
                          <button
                            onClick={() => handleRemoveItem(item._id)}
                            className={styles.removeButton}
                          >
                            Remove
                          </button>
                        </div>
                      )}
                      {user?.name === item.author &&
                        user.role !== "author" && (
                          <button
                            onClick={() => handleRemoveItem(item._id)}
                            className={styles.removeButton}
                          >
                            Remove
                          </button>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

      {!itemForm && (
        <div className={styles.contactBtn}>
          <button
            onClick={() => {
              setItemForm(true);
            }}
            className={styles.addTodoButton}
          >
            Add Item
          </button>
        </div>
      )}
    </main>
  );
}

export default ListPageCompo;
