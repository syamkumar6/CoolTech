import axios from 'axios';
import { useLoaderData } from 'react-router-dom';

export async function loader() {
    axios.defaults.withCredentials = true
    const StockRes = await axios.get("http://localhost:3000/stocks");
    const stockData = StockRes.data
    return { stockData}
  }

function Stocks() {
    const {stocks} = useLoaderData()
    console.log(stocks)
  return (
    <div>Stocks</div>
  )
}

export default Stocks