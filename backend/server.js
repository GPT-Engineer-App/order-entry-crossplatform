const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();
app.use(cors());

const config = {
  user: "sa",
  password: "@$Sa4257",
  server: "salesgroup.kz,4041",
  database: "Lbs_db_FC",
  options: {
    encrypt: true,
    enableArithAbort: true,
  },
};

app.get("/accounts", async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT CODE AS [Cari_Kodu], DEFINITION_ AS [Cari Adı], SPECODE AS [Türü] FROM Lbs_db_FC..LG_202_CLCARD`;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
