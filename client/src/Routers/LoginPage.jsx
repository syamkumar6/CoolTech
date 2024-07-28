import axios from 'axios'
import styles from './LoginPage.module.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addAuth, addUser } from '../Readux/Features/AuthSlice';
import toast from 'react-hot-toast';

function LoginPage() {
  const baseURL = import.meta.env.VITE_BASE_URL
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [number, setNumber] = useState("");

  axios.defaults.withCredentials = true
      useEffect(() => {
        axios.post(`${baseURL}/users/verify`)
          .then(res => {
              if(res.data.Status === "Verify-Success") {
                dispatch(addAuth(true))
                dispatch(addUser(res.data.user))
              }else{
                console.error("Verification failed:", res.data.Message)
                navigate("/")
              }
          })
         
      }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (number.length < 9 || number.length > 10) {
      toast.error("Invalid Mobile Number, Pease Try Again");
      setNumber("");
      return;
    }
    try {
      axios.defaults.withCredentials = true
      const res = await axios.post(`${baseURL}/users/login`, {
        number: number,
      });
      console.log(res.data);
      setNumber("");
      navigate("/")

    } catch (err) {
      toast.error(err.response?.data?.Message || "Server Side Error, Please Try Again");
      setNumber("");
      console.error(err);
    }
  };
  return (
    <main className={styles.loginPage}>
        
        <form onSubmit={handleSubmit} className={styles.container}>

          <label htmlFor="number">Phone</label>
          <input
            type="numer"
            id="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />

          <button type="submit" className={styles.submitBtn}>
            Login
          </button>
        </form>
        
    </main>
  )
}

export default LoginPage