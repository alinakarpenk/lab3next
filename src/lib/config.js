import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import mysql2 from "mysql2"
dotenv.config(); 

const db = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      host: process.env.DATABASE_HOST,
      dialect: 'mysql',
      logging: false,
      dialectModule: mysql2
    }
  );

  export default db;