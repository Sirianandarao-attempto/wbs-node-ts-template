import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import "#db";
import router from "./routers/index.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";
import { notFound } from "./middlewares/notFound.ts";

dotenv.config({ path: ".env.development.local" });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(notFound);
app.use(errorHandler);

// Routes
app.use("/api", router);
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Then start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
