import { ConnectionOptions } from "typeorm";

const connectionOptions: ConnectionOptions = {
  cli: {
    migrationsDir: "migration"
  },
  database: process.env.DB_NAME,
  entities: ["src/entities/**/*.*"],
  host: process.env.DB_ENDPOINT,
  logging: true,
  migrations: ["src/migration/*.ts"],
  password: process.env.DB_PASSWORD,
  port: 5432,
  synchronize: true,
  type: "postgres",
  username: process.env.DB_USERNAME
};

export default connectionOptions;
