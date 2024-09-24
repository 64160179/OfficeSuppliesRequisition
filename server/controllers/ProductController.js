import Product from "../models/ProductModel.js";
import User from "../models/UserModel.js";
import Locations from "../models/LocationModel.js";
import CountingUnits from "../models/CountingUnitModel.js";
import { Op } from "sequelize";

export const getProducts = async (req, res) => {
    // รับค่าการค้นหาจาก query string
    const search = req.query.search || ''; // ถ้าไม่มีค่า search จะใช้ค่าเริ่มต้นเป็นค่าว่าง


    try {
        let response;
        if (req.role === "admin") {
            response = await Product.findAll({
                attributes: ['id', 'uuid', 'code', 'name', 'quantity', 'visible', 'locationId', 'countingunitId'],
                include: [
                    {
                        model: Locations,
                        attributes: ['name'],
                        where: {
                            name: { [Op.like]: `%${search}%` }
                        },
                        required: false // ทำให้การรวมนี้เป็น optional
                    },
                    {
                        model: CountingUnits,
                        attributes: ['name'],
                        where: {
                            name: { [Op.like]: `%${search}%` }
                        },
                        required: false // ทำให้การรวมนี้เป็น optional
                    }
                ],
                where: {
                    // ใช้ Op.or เพื่อค้นหาหลายฟิลด์พร้อมกัน
                    [Op.or]: [
                        { name: { [Op.like]: `%${search}%` } },
                        { '$Location.name$': { [Op.like]: `%${search}%` } },
                        { '$CountingUnit.name$': { [Op.like]: `%${search}%` } }
                    ]
                }
            });
        } else {
            response = await Product.findAll({
                attributes: ['id', 'uuid', 'code', 'name', 'quantity', 'visible'],
                where: {
                    visible: true,
                    // ใช้ Op.or เพื่อค้นหาหลายฟิลด์พร้อมกัน
                    [Op.or]: [
                        { name: { [Op.like]: `%${search}%` } },
                        { code: { [Op.like]: `%${search}%` } },
                    ]
                },
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!product) return res.status(404).json({ msg: "ไม่พบข้อมูล !" });
        let response;
        if (req.role === "admin") {
            response = await Product.findOne({
                attributes: ['id', 'uuid', 'code', 'name', 'quantity', 'visible', 'locationId', 'countingunitId'],
                where: {
                    id: product.id
                },
                include: [
                    {
                        model: Locations,
                        attributes: ['name']
                    },
                    {
                        model: CountingUnits,
                        attributes: ['name']
                    }
                ]
            });
        } else {
            response = await Product.findOne({
                attributes: ['id', 'uuid', 'code', 'name', 'unit', 'quantity', 'category'],
                where: {
                    [Op.and]: [{ id: product.id }, { userId: req.userId }], visible: 'visible'
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const generateProductCode = async () => {
    try {
        const products = await Product.findAll({
            attributes: ['code'],
            order: [['id', 'ASC']]
        });

        let newCode = 'A001';
        if (products.length > 0) {
            const codes = products.map(product => product.code);
            let maxNumber = 0;

            codes.forEach(code => {
                const number = parseInt(code.slice(1), 10);
                if (number > maxNumber) {
                    maxNumber = number;
                }
            });

            let nextNumber = maxNumber + 1;
            newCode = `A${nextNumber.toString().padStart(3, '0')}`;
        }

        return newCode;
    } catch (error) {
        console.error('Error generating product code:', error);
        throw error;
    }
}

export const createProduct = async (req, res) => {
    const { name, countingunitId, quantity, locationId, visible } = req.body;
    try {
        const existingProduct = await Product.findOne({
            where: {
                name: name
            }
        });

        if (existingProduct) {
            return res.status(400).json({ msg: "ชื่อวัสดุ - อุปกรณ์นี้มีอยู่ในระบบแล้ว !" });
        }

        // ค้นหา id ของ counting unit
        const countingUnitData = await CountingUnits.findByPk(countingunitId);
        if (!countingUnitData) {
            return res.status(404).json({ msg: "กรุณาเลือกหน่วยนับ !" });
        }

        // ค้นหา id ของ location
        const locationData = await Locations.findByPk(locationId);
        if (!locationData) {
            return res.status(404).json({ msg: "กรุณาเลือกสถานที่จัดเก็บ !" });
        }

        const code = await generateProductCode();

        await Product.create({
            code: code,
            name: name,
            quantity: quantity,
            locationId: locationData.id, // ใช้ id ของ location
            countingunitId: countingUnitData.id, // ใช้ id ของ counting unit
            visible: visible
        });
        res.status(201).json({ msg: "เพิ่มวัสดุ - อุปกรณ์สำเร็จ !" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!product) return res.status(404).json({ msg: "ไม่พบข้อมูล !" });

        const { name, countingunitId, quantity, locationId } = req.body;

        const existingProduct = await Product.findOne({
            where: {
                name: name,
                id: { [Op.ne]: product.id } // ตรวจสอบชื่อที่ไม่ใช่ของผลิตภัณฑ์นี้
            }
        });

        if (existingProduct) {
            return res.status(400).json({ msg: "ชื่อวัสดุ - อุปกรณ์นี้มีอยู่ในระบบแล้ว !" });
        }

        // ค้นหา id ของ counting unit
        const countingUnitData = await CountingUnits.findByPk(countingunitId);
        if (!countingUnitData) {
            return res.status(404).json({ msg: "กรุณาเลือกหน่วยนับ !" });
        }

        // ค้นหา id ของ location
        const locationData = await Locations.findByPk(locationId);
        if (!locationData) {
            return res.status(404).json({ msg: "กรุณาเลือกสถานที่จัดเก็บ !" });
        }

        await Product.update({
            name: name,
            quantity: quantity,
            locationId: locationData.id, // ใช้ id ของ location
            countingunitId: countingUnitData.id, // ใช้ id ของ counting unit
        }, {
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json({ msg: "อัพเดทวัสดุ-อุปกรณ์สำเร็จ !" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updateProductVisibility = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!product) return res.status(404).json({ msg: "ไม่พบข้อมูล !" });

        const newVisibility = !product.visible;
        const newStatus = newVisibility ? 'visible' : 'hidden';

        await Product.update({
            visible: newVisibility,
            status: newStatus
        }, {
            where: {
                id: product.id
            }
        });
        res.status(200).json({ msg: "อัพเดทสถานะการมองเห็นสำเร็จ !" });
    } catch (error) {
        console.error('Error updating product visibility:', error.message);
        res.status(500).json({ msg: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const product = await Product.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!product) return res.status(404).json({ msg: "ไม่พบข้อมูล !" });
    try {
        await Product.destroy({
            where: {
                id: product.id
            }
        });
        res.status(200).json({ msg: "ลบวัสดุ-อุปกรณ์สำเร็จ !" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}