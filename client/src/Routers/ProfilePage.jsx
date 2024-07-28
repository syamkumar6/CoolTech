import axios from "axios";
import styles from "./Profile.module.css";
import { useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  addSingleUser,
  addUsers,
  deleteUser,
} from "../Readux/Features/UsersSlice";
import manIcon from "../assets/man.svg";

export async function loader() {
  const UserRes = await axios.get("http://localhost:3000/users");
  const resData = UserRes.data;
  return { resData };
}

function ProfilePage() {
  const { resData } = useLoaderData();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.usersList);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    dispatch(addUsers(resData));
  }, [resData, dispatch]);

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/users", {
        name: name,
        number: number,
      });
      console.log(res.data);
      setName("");
      setNumber("");
      dispatch(addSingleUser(res.data));
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveUser = (userId) => {
    try {
      dispatch(deleteUser(userId));
      axios
        .delete("http://localhost:3000/users/" + userId)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeStatus = (userId) => {
    try {
      axios
        .post("http://localhost:3000/users/update/" + userId)
        .then((res) => {
          console.log(res.data);
          dispatch(addUsers(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main>
      <div>
        <h2>Users</h2>
        <ul className={styles.userCards}>
          {users.map((user, index) => {
            return (
              <li key={index} className={styles.userCard}>
                <div>
                  <img src={manIcon} alt="" />
                  <div>
                    <span>{user.name}</span>
                    <span>{user.number}</span>
                  </div>
                </div>

                <div className={styles.btnDiv}>
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
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <form onSubmit={handleAddUser} className={styles.container}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="number">Mobile number</label>
          <input
            type="numer"
            id="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />

          <button type="submit" className={styles.submitBtn}>
            Add User
          </button>
        </form>
      </div>
    </main>
  );
}

export default ProfilePage;
