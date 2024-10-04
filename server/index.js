import express from "express";
import cors from "cors";
import session from "express-session";
import SequelizeStore from "connect-session-sequelize";
import db from "./config/Database.js";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import LocationRoute from "./routes/LocationRoute.js";
import CountingRoute from "./routes/CountingRoute.js";
import BuyInRoute from "./routes/BuyInRoute.js";
import PayOutRoute from "./routes/PayOutRoute.js";
import WareHouseRoute from "./routes/WareHouseRoute.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// สร้าง SequelizeStore โดยใช้ session store ที่ Sequelize จัดการ
const SessionStore = SequelizeStore(session.Store);

// กำหนดการตั้งค่าร้านเก็บ session (session store)
const store = new SessionStore({
    db: db,
});

(async () => {
    try {
        // ซิงค์โมเดลกับฐานข้อมูล
        await db.sync();
        console.log("Database synced successfully.");
    } catch (error) {
        console.error("Unable to sync database:", error);
    }
})();

store.sync();

app.use(cors({
    credentials: true,
    origin: 'http://localhost'
}));

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(express.json());

app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);
app.use(LocationRoute);
app.use(CountingRoute);
app.use(BuyInRoute);
app.use(PayOutRoute);
app.use(WareHouseRoute);

app.listen(process.env.APP_PORT, () => {
    console.log(`Server up and running on port ${process.env.APP_PORT} ...`);
});
