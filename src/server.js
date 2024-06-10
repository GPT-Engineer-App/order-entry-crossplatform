const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());

const config = {
  user: "sa",
  password: "@$Sa4257",
  server: "salesgroup.kz",
  port: 4041,
  database: "Lbs_db_FC",
  options: {
    encrypt: false,
    enableArithAbort: true,
  },
};

sql
  .connect(config)
  .then(() => {
    console.log("Connected to the database");

    app.get("/accounts", async (req, res) => {
      try {
        const result = await sql.query`SELECT CODE AS [Current_Code], DEFINITION_ AS [Current Name], SPECODE AS [Type] FROM Lbs_db_FC..LG_202_CLCARD`;
        res.json(result.recordset);
      } catch (error) {
        console.error("Error fetching accounts:", error);
        res.status(500).send("Error fetching accounts");
      }
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
