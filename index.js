import express from "express";
import { startServer } from "./src/config/server/server-config.js";
import middlewares from "./src/middlewares/utils/middlewares.js";
import routeIndex from "./src/routes/routeIndex.js";
import dotenv from "dotenv";
import { createStockData } from "./src/helpers/db/redis-db-helper.js"; // Assuming you have a separate file for createStockData.
import { scheduleCronJob } from "./src/services/scrapeStockData.js";
import { watchVariable } from "./src/services/variableWatcher.js";

const app = express();

// for getting env variables
dotenv.config();

// calling all the essential middlewares
app.use(middlewares);

global.cronJobCompleted = false;

// connect to redis
// getClient();

// entry to all routes
app.use("/", routeIndex);

// Start the server
startServer(app);

(async () => {
  await scheduleCronJob(); // Wait for the cron job to complete

  // Check ABC at regular intervals (e.g., every second)
  setInterval(watchVariable, 3600000);
})();
