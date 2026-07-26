import express from "express";
import cors from "cors";

import releaseRoutes from "./routes/release.routes";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "Release Checklist API Running Successfully.",
  });
});

app.use("/api/releases", releaseRoutes);

app.use(errorMiddleware);

export default app;

