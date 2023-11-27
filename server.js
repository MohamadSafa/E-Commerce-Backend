const express = require("express");
//const bodyParser = require('body-parser');
const app = express();
const connection = require("./config/database");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors()); // Allow all origins for development; adjust for production

//const blogRoutes = require('./routes/route');
//app.use("/", blogRoutes);
app.listen(PORT, () => {
  connection.dbConnection();
  console.log(`Server is running on http://localhost:${PORT}`);
});
