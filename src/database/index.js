import { Sequelize } from "sequelize";
import config from "./config.js";

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
  }
);

// Test connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("🟢 DB connection has been established successfully.");
  } catch (error) {
    console.error("🔴 Unable to connect to the database:", error);
  }
})();

export default sequelize;
