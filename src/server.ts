import app from "./app.ts";
import { env } from "./config/env.ts";

console.log("PORT is:", env.PORT);
app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});
