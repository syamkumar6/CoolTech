import { useState } from "react";
import styles from "../../Routers/Stocks.module.css";
import closeIcon from "../../assets/closeIcon.svg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addSingleStock, deleteStock } from "../../Readux/Features/StockSlice";
import toast from "react-hot-toast";
import emptyIcon from "../../assets/empty.svg";

function StocksCompo() {
  const baseURL = import.meta.env.VITE_BASE_URL
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authData.userData);
  const stocks = useSelector((state) => state.stocksData.stocks);
  const [itemForm, setItemForm] = useState(false);
  const [itemName, setItemName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [itemQty, setItemQty] = useState("");


  const groupedData = stocks.reduce((acc, item) => {
    acc[item.date] = acc[item.date] || [];
    acc[item.date].unshift(item);
    return acc;
  }, {});

  const itemNames = [
    "1 1/2 x 1\" L Angle Alu (Cleate)",
    "1 1/2 x 1\" Alu Channel (C-Steel)",
    "1 1/2 x 1\" Alu Channel (CB)",
    "1 1/2 x 1\" Alu Channel (Gray)",
    "1 1/2 x 1\" Alu Channel (Ivory)",
    "1 1/2 x 1\" Alu Channel (L-Gray)",
    "1 1/2 x 1\" Alu Channel (Lite Wood)",
    "1 1/2 x 1\" Alu Channel (Malabari)",
    "1 1/2 x 1\" Alu Channel (Steel)",
    "1 1/2 x 1\" Alu Channel (Walnut)",
    "1 1/2 x 1\" Alu Channel (White)",
    "1 1/2 x 1\" Lip Section (C-Steel)",
    "1 1/2 x 1\" W/O Alu Section (C-Steel)",
    "1 1/4 H PVC",
    "1 1/4 Corner",
    "1 1/4 H Channel (CB)",
    "1 1/4 Square H Section (Walnut)",
    "1 1/4\" Alu Square (C-Steel)",
    "1 1/4\" Alu Square (GB)",
    "1 1/4\" Alu Square (Grey)",
    "1 1/4\" Alu Square (Ivory)",
    "1 1/4\" Alu Square (Steel)",
    "1 1/4\" Alu Square (Walnut)",
    "1 1/4\" Alu Square (White)",
    "1\" Angle 1mm (GB)",
    "1\" Angle 1mm (Grey)",
    "1\" Angle 1mm (Ivory)",
    "1\" Angle 1mm (Malabari)",
    "1\" Angle 1mm (Walnut)",
    "1\" Angle 1mm (White)",
    "1\" L Angle Alu (Cleat)",
    "1\" Suqare Channel (malabari)",
    "1\" Suqare Channel (Walnut)",
    "10-20 Handle 12\" (Black)",
    "10-20 Handle 10\"",
    "10-20 Handle 12\"",
    "10-20 Handle 4\"",
    "10-20 Handle 6\"",
    "10-20 Handle 8\"",
    "10mm Kitchen Cabinet (Walnut)",
    "12mm S/Lock (White)",
    "12mm S/Plain (White)",
    "18mm 2 Track Bottom 12' (Ivory)",
    "18mm Runner (CB)",
    "18mm Runner (Ivory)",
    "18mm Runner (White)",
    "18mm S/Lock (White)",
    "18mm S/Plain (White)",
    "18mm S/L (CB)",
    "18mm S/P (Ivory)",
    "18mm S/P (CB)",
    "2 1/2 x 1 1/2 D/G Alu (GB)",
    "2 1/2 x 1 1/2 D/G Alu (Ivory)",
    "2 1/2 x 1 1/2 D/G Alu (Walnut)",
    "2 1/2 x 1 1/2 D/G Alu (White)",
    "2 1/2 x 1 1/2 D/G Alu (Malabari)",
    "2 1/2 x 1 1/2 S/G Alu (GB)",
    "2 1/2 x 1 1/2 S/G Alu (Ivory)",
    "2 1/2 x 1 1/2 S/G Alu (Walnut)",
    "2 1/2 x 1 1/2 S/G Alu (White)",
    "2 1/2 x 1 1/2 S/G Alu (Malabari)",
    "20mm 2 Track Bottom (CB)",
    "20mm 2 Track Bottom (Ivory)",
    "20mm 2 Track T/Side (White)",
    "20mm Moulding 5mm Lip (GB)",
    "20mm Moulding 5mm Lip (Malabari)",
    "20mm Moulding 5mm Lip (Walnut)",
    "20mm Moulding 5mm Lip (White)",
    "25 S Runner (Walnut)",
    "25 S S/Lock (Walnut)",
    "25 S S/Plain (Walnut)",
    "2mm Angle 1 1/2 x 1 (Malabari)",
    "3 Track Bottom 20s 12'",
    "3 x 1 Plain Alu (GB)",
    "3 x 1/2 Plain Alu (GB)",
    "3/4 x 3/4 Alu Section (C-Steel)",
    "3/4 x 3/8 L Angle Alu (Cleat)",
    "3/4\" Alu H (Ivory)",
    "3/4\" L Angle Alu (Cleat)",
    "3/8 U Channel (Walnut)",
    "3/8 U Channel (Ivory)",
    "3/8 U Channel (CB)",
    "3/8 U Channel (GB)",
    "3/8 U Channel (White)",
    "3mm H Alu (C-Steel)",
    "3mm H Alu (Steel)",
    "3mm H Alu (White)",
    "4 x 1 3/4 Alu (Malabari)",
    "4 x 1 Plain Alu (Walnut)",
    "4\" Alu Luver (Ivory)",
    "40 S Open Type Lock",
    "40mm Chair Alu Section (White)",
    "40mm Clip Alu Section (White)",
    "7/8 Corner PVC",
    "7/8 Square With Lip (GB)",
    "7/8 Square With Lip (C-Steel)",
    "7/8 Square With Lip (CB)",
    "7/8 Square With Lip (Malabari)",
    "7/8 Square With Lip (Steel)",
    "7/8 Square With Lip (Walnut)",
    "PVC A Section (Marble White)",
    "Adjustable Louver 22\" 5 Leaf",
    "Adjustable Louver 13 1/2\"",
    "Adjustable Louver 18 1/2\"",
    "Adjustable Louver 25 1/2\"",
    "Adjustable Louver 29\"",
    "Adjustable Louver 3 Leaf 11\"",
    "Albraco 12mm Alu Strip",
    "Alfence Alu (CB)",
    "Alfence Alu (White)",
    "Alfence Alu (GB)",
    "Alfence Corner",
    "Alfence Corss Fitter (GB)",
    "Alfence Corss Fitter (White)",
    "Alfence Handle (GB)",
    "Alfence Sleek Alu Channel (GB)",
    "Alfence Sleek Alu Channel (White)",
    "Alfence Sleek Corner",
    "Alfence Sleek Cross Fitter (White)",
    "Alfence Stopper (CB)",
    "Alfence Stopper (GB)",
    "Alfence Stopper (White)",
    "Algeria 2 Track 10' (White)",
    "Algeria 2 Track 12' (White)",
    "Algeria 3 Track 12' (White)",
    "Algeria L/Clip 12' (White)",
    "Algeria L/Clip 7' (White)",
    "Algeria S/Plain 12' (White)",
    "Algeria S/Plain 10' (White)",
    "Algeria S/Plain With Mesh 10' (White)",
    "Algeria Sliding Window Lock (White)",
    "Auto Close Hinges SS304 Sleek (4 Hole)",
    "Rivet Anish 1/8 x 1/2",
    "C Channel (Grey)",
    "C Channel (GB)",
    "C Channel (Malabari)",
    "C Channel (Walnut)",
    "C Channel (White)",
    "CSK Screw Star 4 x 13",
    "CSK Screw Star 8 x 38",
    "D Kitchen (Grey)",
    "D Kitchen (Malabari)",
    "D Kitchen (Walnut)",
    "D Kitchen (White)",
    "D Kitchen (Ivory)",
    "D Kitchen (GB)",
    "Door Corner 6\" Big",
    "Drawer Section (White)",
    "Dry Wall Screw 1 1/2\"",
    "Dry Wall Screw 1 1/4\"",
    "Dry Wall Screw 1\"",
    "Dry Wall Screw 2 1/2\"",
    "Dry Wall Screw 2\"",
    "Dry Wall Screw 3/4\"",
    "Eagle Star Lock 71 (Black)",
    "Eagle Star Lock 71 (White)",
    "Eb Square Lock 22mm",
    "Eb Square Lock 22mm (Sliding)",
    "Eb Handle Screw",
    "Eb Short Harm Hinges (4 Hole)",
    "F Bracket 4\"",
    "F Bracket 6\"",
    "F Channel (Grey)",
    "F Channel (Lite Wood)",
    "F Channel (Blue)",
    "F Channel (C-Steel)",
    "F Channel (CB)",
    "F Channel (GB)",
    "F Channel (Ivory)",
    "F Channel (Malabari)",
    "F Channel (Steel)",
    "F Channel (Walnut)",
    "F Channel (White)",
    "Fab Lock Ace",
    "Fab Lock Plus R",
    "Gate Hook SS 2\"",
    "Gate Hook SS 5\"",
    "Glazing Clip (CB)",
    "Glazing Clip (GB)",
    "Glazing Clip (Ivory)",
    "Glazing Clip (Malabari)",
    "Glazing Clip (Peach)",
    "Glazing Clip (Walnut)",
    "Glazing Clip (White)",
    "Glazing Plate (GB)",
    "Glazing Plate (Ivory)",
    "Glazing Plate (White)",
    "J Kitchen (CB)",
    "J Kitchen (Cherry)",
    "J Kitchen (GB)",
    "J Kitchen (Grey)",
    "J Kitchen (Ivory)",
    "J Kitchen (Lite Grey)",
    "J Kitchen (Malabari)",
    "J Kitchen (Walnut)",
    "J Kitchen (Steel)",
    "J Kitchen (C-Steel)",
    "J Kitchen (White)",
    "J Lip Alu (C-Steel)",
    "J Lip Alu (Ivory)",
    "J Lip Alu (Malabari)",
    "J Lip Alu (Steel)",
    "J Lip Alu (Walnut)",
    "J Lip Alu (White)",
    "Jewel 4\" Tower Bolt",
    "Kitchen Cabinet Corner",
    "Magic Angle 27s (Crome)",
    "PVC frame (Marble Black)",
    "PVC Door Pannel (Marble Black)",
    "PVC Door Pannel (Marble White)",
    "PVC frame (Marble White)",
    "Mosquito Net Main Door Corner (Alu)",
    "Mosquito Net Main Door Corner (Nylon)",
    "Mosquito Net Main Door handle (White)",
    "Mosquito Net Main Door handle (GB)",
    "Mosquito Net Main Door Hinges (White)",
    "Mosquito Net Main Door Hinges (HG)",
    "J Kitchen Corner PVC",
    "Rutva Handle 4\"",
    "Rutva Handle 10\"",
    "Rutva Handle 6\"",
    "Rutva Handle 8\"",
    "Silicon Sealant 789 (Clear)",
    "Silicon Sealant 789 (Black)",
    "Silicon Sealant (White)",
    "Sliding Wheel 18mm",
    "Sliding Window Lock (Tyto)",
    "SS Hinges 3\" (Cut-Narrow)",
    "SS Hinges 3\" (Ria Gold)",
    "SS Hinges 3\" (Narrow)",
    "SS Hinges 4\" H",
    "SS Hinges Short Soft Close",
    "SS Knob Square",
    "SS Telescopic Slider 20\" (Stars)",
    "Sujin Handle 12\"",
    "Sujin Handle 7\"",
    "Sujin Handle 9\"",
    "Sunmica 1567",
    "Sunmica 5023",
    "Sunmica 5029",
    "Sunmica 5030",
    "Sunmica 5052",
    "Sunmica 5224",
    "Sunmica 5320",
    "Sunmica 5361",
    "Sunmica 5380",
    "Sunmica 5735",
    "Sunmica 5736",
    "Sunmica 5738",
    "Sunmica 5769",
    "Sunmica 760",
    "Sunmica 5737",
    "T - Channel (Ivory)",
    "T - Channel (GB)",
    "Telescopic Slider 10\"",
    "Telescopic Slider 12\"",
    "Telescopic Slider 14\"",
    "Telescopic Slider 16\"",
    "Telescopic Slider 18\"",
    "Telescopic Slider 20\"",
    "Telescopic Slider SS 20\"",
    "TKT (CB)",
    "TKT (Lite Wood)",
    "TKT (Malabari)",
    "TKT (Off White)",
    "TKT (Peach)",
    "TKT (Teak)",
    "TKT (White)",
    "Top Pivot",
    "Wall Plug 6mm",
    "Wall Plug 8mm",
    "Water Channel (C-Steel)",
    "Water Channel (GB)",
    "Water Channel (Ivory)",
    "Water Channel (Malabary)",
    "Water Channel (Steel)",
    "Water Channel (Walnut)",
    "Water Channel (White)",
    "Weather Strip (Door)",
    "Weather Strip (Window)",
    "Window 20mm Corner PVC",
    "Window 25mm Lip Corner",
    "Wood Screw 75 x 8 Star",
    "PVC Sheet Sarvesh (White)",
    "PVC Sheet Sarvesh (Black)"
  ];

  const handleNameChange = (e) => {
    const input = e.target.value;
    console.log(input)
    setItemName(input);
    console.log(itemName)
    if (input.length > 0) {
      const filteredSuggestions = itemNames.filter((name) =>
        name.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setItemName(suggestion)
    setSuggestions([]);
  };
  

  const handleAddItem = async (e) => {
    e.preventDefault();

    if (itemName.length < 2 || itemName.length > 40) {
      toast.error("Name must be between 2 and 40 characters long.");
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

    if (itemQty.length < 1) {
      toast.error("Quantity must be at least 1 character long.");
      setItemName("");
      setItemQty("");
      return;
    }

    try {
      const res = await axios.post(`${baseURL}/stocks`, {
        name: itemName,
        qty: itemQty,
        user: user.name,
      });
      console.log(res.data);
      setItemName("");
      setItemQty("");
      dispatch(addSingleStock(res.data));
      setItemForm(false);
      toast.success("New Item Added");
    } catch (err) {
      toast.error("Internal Server Error, Try Again");
      console.error(err);
    }
  };

  const handleRemoveItem = (itemId) => {
    try {
      dispatch(deleteStock(itemId));
      axios
        .delete(`${baseURL}/stocks/` + itemId)
        .then((res) => {
          console.log(res.data);
          toast.success("Item Removed");
        })
        .catch((err) => {
          toast.error("Internal Server Error, Try Again");
          console.log(err);  
        });
    } catch (err) {
      console.log(err);
    }
  };

  if (stocks.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <img src={emptyIcon} alt="" />
        <h2>Empty</h2>

        {!itemForm && (
          <div className={styles.contactBtn}>
            <button
              onClick={() => setItemForm(true)}
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
                onClick={() => setItemForm(false)}
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
                  <div className={styles.suggestionsContainer}>
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
                  </div>
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
                  Add
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
              onClick={() => setItemForm(false)}
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
                  <div className={styles.suggestionsContainer}>
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
                  </div>
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
                Add
              </button>
            </form>
          </div>
        </>
      )}

      <div>
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
                      <td>{item.user}</td>
                      
                        {(user?.role === "author" ||
                          (user?.name === item.user &&
                            user?.role !== "author")) && (
                              <td className={styles.statusButtons}>
                          <div className={styles.tableBtns}>
                            <button
                              onClick={() => handleRemoveItem(item._id)}
                              className={styles.removeButton}
                            >
                              Close
                            </button>
                          </div>
                          </td>
                        )}
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
      </div>

      {!itemForm && (
        <div className={styles.contactBtn}>
          <button
            onClick={() => setItemForm(true)}
            className={styles.addTodoButton}
          >
            Add Item
          </button>
        </div>
      )}
    </main>
  );
}

export default StocksCompo;

