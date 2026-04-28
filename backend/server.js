import express from "express";
import cors from "cors";
import { getStats } from "./sessionManager.js";
import { startSessions } from "./sessionManager.js";

const app = express();
app.use(cors());

startSessions(10)
app.get("/stats", (req, res) => {
  res.json(getStats());
});

app.listen(4000, () => {
  console.log("API running on port 4000");
});