import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes/index.ts";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.middleware.ts";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use("/api", routes);
app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use(errorMiddleware);

export default app;
