import React, { useState, useEffect } from "react";
import "./Analytics.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = {
          P_Code: sessionStorage["ParallelCode"],
          S_Code: sessionStorage["serialCode"],
        };
        const response = await axios.post("http://localhost:5000/Analysis", {
          body: formData,
          headers: {
            "Content-Type": "application/json",
          },
        });
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="analytics-container">
        {loading ? (
          <div>Loading... Executing code, please wait.</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          <>
            <h1>Analytics</h1>
            <table>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Serial</th>
                  <th>Parallel</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(data.S_Analysis[0]).map((key) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{data.S_Analysis[0][key]}</td>
                    <td>{data.P_Analysis[0][key]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Analytics;
