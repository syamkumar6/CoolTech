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

// Log middleware execution
app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  next();
});

// Ensure CORS middleware is applied
app.use(
  cors({
    origin: ["https://cool-tech.vercel.app", "http://localhost:5173"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options('*', cors());

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
