import { constants } from "node:http2";
import app from "./app.js";

import pool from "./lib/db.js";

app.get("/", async function (req, res) {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      success: true,
      message: "Backend is running well",
      time: result.rows[0],
    });
  } catch (error) {
    res
      .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}`);
});
