import Product from "../models/ProductModel.js";
import User from "../models/UserModel.js";
import Location from "../models/LocationModel.js";
import CountingUnit from "../models/CountingUnitModel.js";

export const getProducts = async (req, res) => {
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

const generateProductCode = async () => {
    try {
        // ดึงรหัสสินค้าล่าสุดจาก Products
        const latestProduct = await Product.findOne({
            order: [['code', 'DESC']],
            attributes: ['code']
        });

        // ถ้าไม่มีสินค้าล่าสุด ให้เริ่มต้นที่ A001
        let newCode = 'A001';
        if (latestProduct && latestProduct.id) {
            const nextId = latestProduct.id + 1;
            const nextNumber = nextId.toString().padStart(3, '0');
            newCode = `A${nextNumber}`;
        }
        return newCode;
    } catch (error) {
        console.error('Error generating product code:', error);
        throw error;
    }
}


export const createProduct = async (req, res) => {
    const { name, unit, quantity, location, visible } = req.body;
    try {
        const code = await generateProductCode();

        // ดึงข้อมูล name จากตาราง Locations
        const locationData = await Location.findOne({
            where: { name: location },
            attributes: ['name']
        });

        if (!locationData) {
            return res.status(404).json({ msg: "ไม่พบสถานที่นี้ !" });
        }
        
        // ดึงข้อมูล name จากตาราง CountingUnits
        const countingUnitData = await CountingUnit.findOne({
            where: { name: unit },
            attributes: ['name']
        });

        if (!countingUnitData) {
            return res.status(404).json({ msg: "ไม่พบหน่วยนับนี้ !" });
        }

        await Product.create({
            code: code,
            name: name,
            quantity: quantity,
            unit: countingUnitData.name, // ใช้ name จากตาราง CountingUnits
            location: locationData.name, // ใช้ name จากตาราง Locations
            visible: visible
        });
        res.status(201).json({ msg: "เพิ่มวัสดุ-อุปกรณ์สำเร็จ !" });
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
        const { name, unit, category, location } = req.body;
        await Product.update({
            name: name,
            unit: unit,
            category: category,
            location: location
        }, {
            where: {
                id: product.id
            }
        });
    } catch (error) {

    }
}

export const updateProductVisibility = async (req, res) => {
    const { id } = req.params;
    const { visible } = req.body;

    try {
        // Find the product by UUID
        const product = await Product.findOne({
            where: {
                uuid: id
            }
        });

        // Check if the product exists
        if (!product) return res.status(404).json({ msg: "ไม่พบข้อมูล !" });

        // Update the product's visibility
        await Product.update({ visible }, {
            where: {
                uuid: id
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