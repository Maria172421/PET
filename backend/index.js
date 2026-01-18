import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import expensesRouter from "./routes/expenses.js";

dotenv.config(); 

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/expenses", expensesRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
