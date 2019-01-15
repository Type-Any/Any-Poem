import { ConnectionOptions } from "typeorm";

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: ["src/entities/**/*.*"],
  host: process.env.DB_ENDPOINT,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  migrations: ["src/migration/*.ts"],
  cli: {
    migrationsDir: "migration"
  }
};

export default connectionOptions;
