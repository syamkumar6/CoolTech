const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 3000;

const MaterialsRouter = require("./routes/materialsRouter");
const UsersRouter = require("./routes/UsersRouter");
const StocksRouter = require("./routes/StocksRouter");
const HistoryRouter = require("./routes/historyRouter");

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ["http://localhost:5173"];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["POST", "GET", "DELETE", "PUT"],
  credentials: true,
}));

// Handle preflight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

app.use("/materials", MaterialsRouter);
app.use("/users", UsersRouter);
app.use("/stocks", StocksRouter);
app.use("/history", HistoryRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

main()
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

async function main() {
  const db_url = process.env.DB_URL;
  const urlWithPassword = db_url.replace("<password>", process.env.DB_PASSWORD);
  await mongoose.connect(urlWithPassword, { useNewUrlParser: true, useUnifiedTopology: true });
}
