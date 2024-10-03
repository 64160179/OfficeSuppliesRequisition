import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Products from "./ProductModel.js";

const {DataTypes} = Sequelize;

const WareHouses = db.define('warehouses', {
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Products,
            key: 'id'
        },
        validate: {
            notEmpty: true,
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            notEmpty: true
        }
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    summary: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
}, {
    freezeTableName: true,
    timestamps: true
});

export default WareHouses;