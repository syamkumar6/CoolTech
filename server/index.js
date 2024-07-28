const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config()
const cookieParses = require("cookie-parser");

const MarerialsRouter = require("./routes/materialsRouter");
const UsersRouter = require("./routes/UsersRouter");
const StocksRouter = require("./routes/StocksRouter")
const HistoryRouter = require("./routes/historyRouter")

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParses());
app.use(
  cors({
    origin: ["https://cool-tech-eny4gner7-syam-kumars-projects.vercel.app", "http://localhost:5173"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/materials", MarerialsRouter);
app.use("/users", UsersRouter);
app.use("/stocks", StocksRouter);
app.use("/history", HistoryRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

main()
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

async function main() {
  const db_url = process.env.DB_URL;
  const urlWithPassword = db_url.replace("<password>", process.env.DB_PASSWORD);
  await mongoose.connect(urlWithPassword);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
