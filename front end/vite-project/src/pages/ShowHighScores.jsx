import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import "./ShowHighScores.css";

function ShowHighScores() {
  const [scores, setScores] = useState([]);
  const [topPlayer, setTopPlayer] = useState(null);
  const [bestTime, setBestTime] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/scores")
      .then((res) => {
        setScores(res.data);

        // Find best score (lowest time)
        if (res.data.length > 0) {
          let top = res.data[0];
          res.data.forEach((score) => {
            if (score.time < top.time) {
              top = score;
            }
          });
          setTopPlayer(top.player);
          setBestTime(top.time);
        }
      })
      .catch((err) => {
        console.error("Failed to load scores:", err);
      });
  }, []);

  return (
    <div>
      <Header />
      <h2>🏆 Top Score: {topPlayer} - {bestTime}s</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Time Taken (s)</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr
              key={index}
              style={{ backgroundColor: score.player == topPlayer ? "#c0f7c0" : "white" }}
            >
              <td>{score.player}</td>
              <td>{score.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowHighScores;