import { DataTypes } from "sequelize";
import sequelize from "../lib/config_db.js";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
},
{
    tableName: 'user',
    timestamps: false
}
);

export default User;