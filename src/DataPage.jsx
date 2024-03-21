import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DataPage.css"; // Import CSS file for styling
import { useNavigate } from "react-router-dom";



const DataPage = () => {
  const [entries, setEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(5);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/entries`
        );
        console.log("FETCH_RESPONSE",response);
        setEntries(response.data.entries);
      } catch (err) {
        console.error("Error fetching entries:", err);
      }
    };
    fetchData();
  }, []);

  // Logic for pagination
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
    <button onClick={()=>{navigate('/')}} style={{ padding: "0.8rem 1.5rem",marginBottom:"5px", backgroundColor: "#161816", color: "white", border: "none", borderRadius: "4px", cursor: "pointer"}}>Back</button>
      <h1>Submitted Entries</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Code Language</th>
            <th>STDIN</th>
            <th>Timestamp</th>
            <th>Source Code (Limited)</th>
          </tr>
        </thead>
        <tbody>
          {currentEntries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.username}</td>
              <td>{entry.language}</td>
              <td>{entry.stdInput}</td>
              <td>{entry.createdAt}</td>
              <td>{entry?.sourceCode.slice(0, 100)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <ul className="pagination">
        {Array.from(
          { length: Math.ceil(entries.length / entriesPerPage) },
          (_, i) => (
            <li key={i} className={currentPage === i + 1 ? "active" : ""}>
              <button onClick={() => paginate(i + 1)}>{i + 1}</button>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default DataPage;
