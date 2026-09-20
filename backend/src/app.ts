import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import productRouter from "./routes/product.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/products", productRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});  

export default app;