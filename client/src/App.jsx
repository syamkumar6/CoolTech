import axios from 'axios'

export async function loader() {
  const res = await axios.get("http://localhost:3000/materials")
  const data = res.data
  return {data}
}

function App() {
  const data = [
    {
      "no":1,
      "name": "anu",
      "qty": "2",
      "status": false,
      "date": "01/03/2024",
      "day": "Sunday"
    },
    {
      "no":2,
      "name": "beena",
      "qty": "5 lng",
      "status": false,
      "date": "01/03/2024",
      "day": "Sunday"
    },
    {
      "no":1,
      "name": "kichu",
      "qty": "8",
      "status": false,
      "date": "01/04/2024",
      "day": "Monday"
    },
    {
      "no":1,
      "name": "aaa",
      "qty": "27",
      "status": false,
      "date": "11/03/2024",
      "day": "Sunday"
    },
    {
      "no":1,
      "name": "kk",
      "qty": "56",
      "status": false,
      "date": "12/03/2024",
      "day": "Monday"
    },
    {
      "no":2,
      "name": "pp",
      "qty": "2",
      "status": false,
      "date": "12/03/2024",
      "day": "Monday"
    },
  ];

  // Group data by date
  const groupedData = data.reduce((acc, item) => {
    acc[item.date] = acc[item.date] || [];
    acc[item.date].unshift(item); // Add the new item at the beginning
    return acc;
  }, {});

  return (
    <div>
      <header className="h-20 w-full text-white font-bold flex flex-col items-center justify-center md:px-8 shadow-lg bg-blue-950">
        <span className="text-3xl mt-2">
          Head<span className="text-orange-500"> Title</span>
        </span>
        <span>Cnt</span>
      </header>
      {Object.entries(groupedData).map(([date, items]) => (
        <div key={date}>
          <div className="flex flex-row justify-between px-2 mt-4 border-b">
            <span className="text-center font-medium text-gray-500 pb-2 mt-5">{date}</span>
            <span className="text-center font-medium text-gray-500 pb-2 mt-5">{items[0].day}</span>
          </div>
          <table className="w-full divide-y divide-gray-200 md:table">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">no</th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">Name</th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">Qty</th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 md:table-row-group">
              {items.map((item, index) => (
                <tr key={index} className="md:table-row border-b border-gray-300">
                  <td className="px-3 py-2 whitespace-nowrap md:table-cell border-r border-gray-300">{item.no}</td>
                  <td className="px-3 py-4 whitespace-nowrap md:table-cell border-r border-gray-300">{item.name}</td>
                  <td className="px-3 py-4 whitespace-nowrap md:table-cell border-r border-gray-300">{item.qty}</td>
                  <td className="px-3 py-4 whitespace-nowrap md:table-cell border-r border-gray-300">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default App;
