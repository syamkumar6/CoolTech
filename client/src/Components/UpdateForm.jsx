import styles from "./UpdateCom.module.css";
import { useState } from "react";
import axios from "axios";

function UpdateForm({ setItemForm, selectedItem}) {
  const [itemName, setItemName] = useState(selectedItem.name);
  const [itemQty, setItemQty] = useState(selectedItem.qty);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:3000/stocks/${selectedItem._id}`, {
        name: itemName,
        qty: itemQty,
      });
     
      setItemForm(false);
      console.log(res.data);
      
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseForm = () => {
    setItemForm(false); 
  };
  return (
    <>
      <div className={styles.fixedOverlay2}> &nbsp;</div>
      <div className={styles.fixedForm2}>
        <form className={styles.form}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder={itemName}
            className={styles.inputField}
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <label htmlFor="qty">Qty</label>
          <input
            type="text"
            id="qty"
            placeholder={itemQty}
            className={styles.inputField}
            value={itemQty}
            onChange={(e) => setItemQty(e.target.value)}
          />
          <button onClick={handleUpdate} className={styles.addButton}>
            Add
          </button>
          <button onClick={handleCloseForm} className={styles.cancelButton}>
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}

export default UpdateForm;
