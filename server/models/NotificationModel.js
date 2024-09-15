import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Notifications = db.define('notifications',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    massage:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    category:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    location:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
},{
    freezeTableName: true
});

export default Notifications;