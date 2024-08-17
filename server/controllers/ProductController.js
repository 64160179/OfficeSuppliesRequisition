import Product from "../models/ProductModel.js";
import User from "../models/UserModel.js";

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
        // ดึงสินค้าที่ถูกสร้างล่าสุดจากฐานข้อมูล
        const lastProduct = await Product.findOne({
            order: [['createdAt', 'DESC']],
            attributes: ['code']
        });

        // ถ้ายังไม่มีสินค้าในฐานข้อมูล ให้เริ่มต้นที่ A001
        if (!lastProduct || !lastProduct.code) {
            return 'A001';
        }

        // ดึงส่วนตัวเลขของรหัสสินค้าล่าสุดและเพิ่มค่า
        const lastCode = lastProduct.code;
        const numberPart = parseInt(lastCode.slice(1), 10);
        const nextNumber = (numberPart + 1).toString().padStart(3, '0');

        // คืนค่ารหัสสินค้าถัดไป
        return `A${nextNumber}`;
    } catch (error) {
        console.error('Error generating product code:', error);
        throw error;
    }
}

export const createProduct = async (req, res) => {
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
}

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