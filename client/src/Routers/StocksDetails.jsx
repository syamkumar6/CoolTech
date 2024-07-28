import axios from 'axios';
import styles from './StocksDetails.module.css';
import { useLoaderData } from 'react-router-dom';

export async function loader({ params }) {
  try {
    const res = await axios.get(`http://localhost:3000/stocks/details/${params.itemId}`);
    return { data: res.data };
  } catch (error) {
    console.error("Error fetching stock details:", error);
    throw new Error("Failed to load stock details");
  }
}

function StocksDetails() {
  const { data } = useLoaderData();

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.stockDetails}>
      {console.log(data)}
    </div>
  );
}

export default StocksDetails;