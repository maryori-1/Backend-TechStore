require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");

connectDB();
const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://techstore-react-xzb4.vercel.app"
  ]
}));

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/productos", require("./routes/productos"));
app.use("/api/pedidos", require("./routes/pedidos"));

app.listen(process.env.PORT || 3000);
