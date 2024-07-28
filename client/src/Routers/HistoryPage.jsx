import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import styles from './HistoryPage.module.css'; // Import your CSS file
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addItem } from '../Readux/Features/ProductSlice';

export async function loader() {
  const hisRes = await axios.get("http://localhost:3000/materials");
  const hisData = hisRes.data;
  return { hisData };
}

function HistoryPage() {
  const { hisData } = useLoaderData();
  const dispatch = useDispatch()
  const itemsList = useSelector((state) => state.items.item)
  const hisItems = itemsList.filter((item)=> item.status === true)

  useEffect(() => {
    dispatch(addItem(hisData))
}, [hisData, dispatch])

const historyData = hisItems?.reduce((acc, item) => {
  acc[item.date] = acc[item.date] || []
  acc[item.date].unshift(item)
  return acc
}, {})

  return (
    <main>
      {Object.entries(historyData).reverse().map(([date, items]) => (
        <div key={date}>
          <div className={styles.flexRow}>
            <span className={styles.tableHeader}>{date}</span>
            <span className={styles.tableHeader}>{items[0].day}</span>
          </div>
          <table className={`${styles.tableContainer} ${styles.responsiveTable}`}>
            <thead className={styles.tableHead}>
              <tr>
                <th scope="col" className={styles.tableCell}>No</th>
                <th scope="col" className={styles.tableCell}>Name</th>
                <th scope="col" className={styles.tableCell}>Qty</th>
              </tr>
            </thead>
            <tbody className={`${styles.tableBody} ${styles.responsiveTableRowGroup}`}>
              {items.map((item, index) => (
                <tr key={index} className={`${styles.tableRow} ${styles.responsiveTableRow}`}>
                  <td className={`${styles.tableCell} ${styles.responsiveTableCell}`}>{item.no}</td>
                  <td className={`${styles.tableCell} ${styles.responsiveTableCell}`}>{item.name}</td>
                  <td className={`${styles.tableCell} ${styles.responsiveTableCell}`}>{item.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </main>
  );
}

export default HistoryPage;
