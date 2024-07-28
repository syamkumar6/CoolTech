import axios from "axios";
import styles from "../../Routers/Profile.module.css";
import { useState } from "react";
import closeIcon from "../../assets/closeIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  addSingleUser,
  addUsers,
  deleteUser,
} from "../../Readux/Features/UsersSlice";
import manIcon from "../../assets/man.svg";
import toast from "react-hot-toast";
import emptyIcon from "../../assets/empty.svg"

function UsersPageCompo({ users }) {
  const baseURL = import.meta.env.VITE_BASE_URL
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [form, setForm] = useState(false);
  const admin = useSelector((state) => state.authData.userData);

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (name.length < 2) {
      toast.error("Name must be at least 2 characters long.");
      setName("");
      setNumber("");
      return;
    }
  
    if (number.length < 9 || number.length > 12) {
      toast.error("Invalid Mobile Number");
      setName("");
      setNumber("");
      return;
    }
    try {
      const res = await axios.post(`${baseURL}/users`, {
        name: name,
        number: number,
      });
      console.log(res.data);
      setName("");
      setNumber("");
      dispatch(addSingleUser(res.data));
      setForm(false);
      toast.success("New User Added ");
    } catch (err) {
      toast.error("Server Side Error. Please Try Again")
      console.error(err);
    }
  };

  const handleRemoveUser = (userId) => {
    try {
      dispatch(deleteUser(userId));
      axios
        .delete(`${baseURL}/users/` + userId)
        .then((res) => {
          console.log(res.data);
          toast.success("The User Has Been  Removed");
        })
        .catch((err) => {
          toast.error("Server Side Error. Please Try Again")
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeStatus = (userId) => {
    try {
      axios
        .post(`${baseURL}/users/update/` + userId)
        .then((res) => {
          console.log(res.data);
          dispatch(addUsers(res.data)); 
          toast.success("User Role Changed")
        })
        .catch((err) => {
          toast.error("Server Side Error. Please Try Again")
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  if(users.length === 1){
    return <div className={styles.emptyContainer}>
      <img src={emptyIcon} alt="" />
      <h2>Currently no user's have been added</h2>

     {!form && (
      <div className={styles.contactBtn}>
      <button
        onClick={() => {
          setForm(true);
        }}
        className={styles.addTodoButton}
      >
        Add A User
      </button>
    </div>
     )}
      
      {form && (
          <>
            <div className={styles.fixedOverlay}> &nbsp;</div>
            <div className={styles.fixedForm}>
              <button
                onClick={() => {
                  setForm(false);
                }}
                className={styles.closeButton}
              >
                <img src={closeIcon} alt="" />
              </button>
              <form onSubmit={handleAddUser} className={styles.form}>
                <label htmlFor="name">Name</label>
                <input
                  className={styles.inputField}
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor="number">Mobile number</label>
                <input
                  className={styles.inputField}
                  type="number"
                  id="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />

                <button type="submit" className={styles.addButton}>
                  Add User
                </button>
              </form>
            </div>
          </>
        )}
    </div>
  }
  return (
    <main className={styles.container}>
      
        <ul className={styles.userCards}>
          {users
            .filter((user) => user.name !== "Roy Michael")
            .map((user, index) => {
              return (
                <li key={index} className={styles.userCard}>
                  <div className={styles.cardDetails}>
                    <img src={manIcon} alt="" />
                    <div>
                      <span>{user.name}</span>
                      <span>{user.number}</span>
                    </div>
                  </div>
                  <div className={styles.btnDiv}>
                    {admin.name === "Roy Michael" && (
                      <>
                       <button
                      onClick={() => handleChangeStatus(user._id)}
                      className={styles.btn}
                    >
                      {user.role === "user" ? "Add to Author" : "Add to Users"}
                    </button>
                    <button
                      onClick={() => handleRemoveUser(user._id)}
                      className={styles.btnRemove}
                    >
                      Remove
                    </button>
                      </>
                    )}
                  </div>
                </li>
              );
            })}
        </ul>
    

      <div>
        {form && (
          <>
            <div className={styles.fixedOverlay}> &nbsp;</div>
            <div className={styles.fixedForm}>
              <button
                onClick={() => {
                  setForm(false);
                }}
                className={styles.closeButton}
              >
                <img src={closeIcon} alt="" />
              </button>
              <form onSubmit={handleAddUser} className={styles.form}>
                <label htmlFor="name">Name</label>
                <input
                  className={styles.inputField}
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor="number">Mobile number</label>
                <input
                  className={styles.inputField}
                  type="number"
                  id="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />

                <button type="submit" className={styles.addButton}>
                  Add User
                </button>
              </form>
            </div>
          </>
        )}
      </div>
      <div className={styles.contactBtn}>
        <button
          onClick={() => {
            setForm(true);
          }}
          className={styles.addTodoButton}
        >
          Add A User
        </button>
      </div>
    </main>
  );
}

export default UsersPageCompo;
