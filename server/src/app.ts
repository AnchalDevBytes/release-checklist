import express from "express";
import cors from "cors";

import releaseRoutes from "./routes/release.routes";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);
app.options("*", cors());

app.use(express.json());

app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "Release Checklist API Running Successfully.",
  });
});

// Support both /api/releases and /releases routes
app.use("/api/releases", releaseRoutes);
app.use("/releases", releaseRoutes);

app.use(errorMiddleware);

export default app;
