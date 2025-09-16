import dotenv from "dotenv"
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/db-auth-1.js";
import authRoutes from "./routes/authRoute-auth-1.js"
import path from "path";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000
const __dirname = path.resolve();

app.use(cors({ origin: [process.env.CLIENT_URL, "http://localhost:5173"], credentials: true }))
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

// --- Servir frontend en producción (Express 5 compatible) ---
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "frontend", "dist");
  app.use(express.static(distPath));

  // ✅ Usa RegExp; evita errores de path-to-regexp con "*", "/*" o "/(.*)"
  // y no interfiere con /api
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
