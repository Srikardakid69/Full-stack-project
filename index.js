const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const PORT = 8000;


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // For dev only
  next();
});


const uri = "mongodb://saisrikar24:mypassword@ac-8hdbss0-shard-00-00.ezwtndj.mongodb.net:27017,ac-8hdbss0-shard-00-01.ezwtndj.mongodb.net:27017,ac-8hdbss0-shard-00-02.ezwtndj.mongodb.net:27017/?ssl=true&replicaSet=atlas-x18g7e-shard-0&authSource=admin&appName=fullstack";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


app.get('/NewScore', async (req, res) => {
  const player = req.query.player;
  const time = req.query.time;

  console.log("Player Name:", player);
  console.log("Time Taken:", time);

  try {
    await client.connect();
    const db = client.db("gameDB");
    const collection = db.collection("scores");

    await collection.insertOne({
      player: player,
      time: parseFloat(time),
      
    });

    res.statusCode = 200;
    res.end("Score saved successfully!");
  } catch (error) {
    console.error("Error inserting data:", error);
    res.statusCode = 400;
    res.end("Server error");
  }
});


app.get('/Scores', async (req, res) => {
  try {
    await client.connect();
    const db = client.db("gameDB");
    const collection = db.collection("scores");

    const allScores = await collection.find({}).toArray();

   
    const formatted = allScores.map(doc => ({
      player: doc.player,
      time: doc.time
    }));

    res.header("Access-Control-Allow-Origin", "*"); // CORS fix
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(formatted));
  } catch (err) {
    console.error("Error fetching scores:", err);
    res.statusCode = 400;
    res.end("Failed to fetch scores");
  }
});
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
