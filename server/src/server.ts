import app from "./app";
import { env } from "./config/env";

if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });
}

export default app;
