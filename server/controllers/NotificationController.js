import Product from "../models/ProductModel.js";
import User from "../models/UserModel.js";

export const getNoti = async (req, res) => {
    try {
        let response;
        if (req.role === "admin") {
            response = await Product.findAll({
                attributes: ['id', 'uuid', 'code', 'name', 'unit', 'quantity', 'category', 'location', 'visible'],
            });
        } else {
            response = await Product.findAll({
                attributes: ['id', 'uuid','code', 'name', 'unit', 'quantity', 'category'],
                where: {
                    visible: 'visible'
                }
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

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
                attributes: ['id', 'uuid','code', 'name', 'unit', 'quantity', 'category', 'location', 'visible'],
                where: {
                    id: product.id
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
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

export const createNoti = async (req, res) => {
    const { name, unit, quantity, category, location, visible } = req.body;
    try {
        const code = await generateProductCode();

        await Product.create({
            code: code,
            name: name,
            unit: unit,
            quantity: quantity,
            category: category,
            location: location,
            visible: visible
        });
        res.status(201).json({ msg: "เพิ่มวัสดุ-อุปกรณ์สำเร็จ !" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deleteNoti = async (req, res) => {
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
        res.status(200).json({ msg: "ลบการแจ้งเตือนสำเร็จ !" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}