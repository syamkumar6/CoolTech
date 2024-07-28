import styles from '../../Routers/HistoryPage.module.css'
import emptyIcon from "../../assets/empty.svg"

function HistoryPageCompo({hisItems}) {
 

    const historyData = hisItems?.reduce((acc, item) => {
        acc[item.date] = acc[item.date] || []
        acc[item.date].unshift(item)
        return acc
      }, {})

      if(hisItems.length === 0){
        return <div className={styles.emptyContainer}>
          <img src={emptyIcon} alt="" />
          <h2>Empty</h2>
        </div>
      }

  return (
    <main className={styles.container}>
  {Object.entries(historyData).reverse().map(([date, items]) => (
    <div key={date}>
      <div className={styles.flexRow}>
        <span className={styles.tableHeader}>{date}</span>
        <span className={styles.tableHeader}>{items[0]?.day}</span>
      </div>
      <table className={`${styles.tableContainer} ${styles.responsiveTable}`}>
        <thead className={styles.tableHeader}>
          <tr>
            <th scope="col" className={styles.tableCell}>No</th>
            <th scope="col" className={styles.tableCell}>Name</th>
            <th scope="col" className={styles.tableCell}>Qty</th>
          </tr>
        </thead>
        <tbody className={`${styles.tableBody} ${styles.responsiveTableRowGroup}`}>
          {items.map((item, index) => (
            <tr key={index} className={`${styles.tableRow} ${styles.responsiveTableRow}`}>
              <td className={`${styles.tableBodyCellNo} ${styles.responsiveTableCell}`}>{index+1}</td>
              <td className={`${styles.tableBodyCellName} ${styles.responsiveTableCell}`}>{item.name}</td>
              <td className={`${styles.tableBodyCell2} ${styles.responsiveTableCell}`}>{item.qty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ))}
  </main>
  )
}

export default HistoryPageCompo