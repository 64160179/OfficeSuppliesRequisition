import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const { DataTypes } = Sequelize;

const PayOut = db.define('payout', {
    quantity: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
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

export default PayOut;