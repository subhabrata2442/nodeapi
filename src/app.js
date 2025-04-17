import "./config/environment.js";
import express from "express";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import { resolve as pathResolve, join as pathJoin } from "path";
import { fileURLToPath } from "url";
import * as Sentry from "@sentry/node";

import apiRouter from "./routes/index.router.js";
import { initializeSentry } from "./config/sentry.config.js";
import locales from "./middlewares/locales.js";
import customReturn from "./middlewares/responseBuilder.js";

const { NODE_ENV, SENTRY_ENABLED, SENTRY_DSN } = process.env;

// __dirname polyfill
const __filename = fileURLToPath(import.meta.url);
const __dirname = pathResolve(pathJoin(__filename, "..", ".."));
const publicDir = pathResolve(pathJoin(__dirname, "public"));

const app = express();

// Common middlewares
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(locales);
app.use(bodyParser.json({ limit: "500mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "500mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(express.static(publicDir));
app.use(customReturn);

// Optional Sentry
if (SENTRY_ENABLED === "true" && SENTRY_DSN) {
  initializeSentry(app, Sentry);
}

// Test route
app.get("/test", (req, res) => {
  res.status(200).send({ msg: "Server is working" });
});

// All API routes
app.use("/api", apiRouter);

export default app;
