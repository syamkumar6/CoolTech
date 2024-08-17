import axios from "axios";
import styles from "./Header.module.css"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { addAuth } from "../Readux/Features/AuthSlice";
import logOutIcon from "../assets/logOut.svg"


function Header() {
  const baseURL = import.meta.env.VITE_BASE_URL
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.authData.userData);


  const logout = () => {
    axios.defaults.withCredentials = true
    axios.post(`${baseURL}/users/logout`)
      .then(res => {
        if (res.data.Status === 'Success') {
          dispatch(addAuth(false))
          navigate('/login');
        } else {
          console.error('Logout failed:', res.data);
        }
      })
      .catch(err => console.error('Error during logout:', err));
  };


  return (
    
        <header className={styles.header}>
        <div className={styles.headerDiv}>
        <h1 className={styles.titleFirst}>
          COOL<span className={styles.titleSecond}> TECH</span>
        </h1>
        <h5 className={styles.subHead}>Home Decor</h5>
        </div>
        <div className="flex flex-row gap-3">
        {user && (<div className={styles.logBtnDiv}>
          <img src={logOutIcon} alt="" /> <Link className={styles.logOutBtn} onClick={logout}>LogOut</Link>
          </div>)}
        
        </div>
        
      </header>
   
  )
}

export default Header