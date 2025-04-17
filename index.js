#!/usr/bin/env node

import { createServer } from "http";
import chalk from "chalk";
import dotenv from "dotenv";
import app from "./src/app.js";

dotenv.config();

const { PORT } = process.env;

const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
};

const port = normalizePort(PORT || "4001");
app.set("port", port);

const server = createServer(app);

const onError = (error) => {
  if (error.syscall !== "listen") throw error;
  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
};

const onListening = () => {
  console.log(chalk.green(`✅ Server is running at http://localhost:${port}`));
};

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
