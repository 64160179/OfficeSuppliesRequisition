import BuyIn from "../models/BuyInModel.js";
import Product from "../models/ProductModel.js";


export const getBuyIn = async (req, res) => {
    try {
        const buyInData = await BuyIn.findAll({
            attributes: ['id', 'doc_number', 'title', 'quantity', 'price', 'summary'],
        });
        res.status(200).json(buyInData);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const createBuyIn = async (req, res) => {
    const {productId, doc_number, title, quantity, price, summary} = req.body;
    try {
        const existingDoc = await BuyIn.findOne({ 
            where: { 
                doc_number: doc_number 
            } 
        });

        if (existingDoc) {
            return res.status(400).json({ msg: "เลขที่เอกสารนี้มีอยู่ในระบบแล้ว !" });
        }

        const productData = await Product.findByPk(productId);

        await createBuyIn.create({
            productId: productData.id,
            doc_number: doc_number ,
            title: title,
            quantity: quantity,
            price: price || null,
            summary: summary || null
        });
        res.status(201).json({ msg: "เพิ่มการซื้อเข้าสำเร็จ !" });
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

