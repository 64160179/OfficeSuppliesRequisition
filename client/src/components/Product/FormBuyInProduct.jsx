import React, { useState, useEffect } from 'react';
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import Select from 'react-select'; // นำเข้า react-select

const FormBuyInProduct = () => {
    const [products, setProducts] = useState([]);
    const [title, setTitle] = useState('');
    const [doc_number, setDoc_number] = useState('');
    const [quantity, setQuantity] = useState('');
    const [countingUnits, setCountingUnits] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [countingUnitName, setCountingUnitName] = useState('');
    const [msg, setMsg] = useState('');
    // const navigate = useNavigate();

    useEffect(() => {
        // Fetch products and counting units from the API
        const fetchData = async () => {
            const productsResponse = await axios.get('http://localhost:5000/products');
            const countingUnitsResponse = await axios.get('http://localhost:5000/countingUnits');
            setProducts(productsResponse.data);
            setCountingUnits(countingUnitsResponse.data);
        };
        fetchData();
    }, []);

    const handleProductChange = (selectedOption) => {
        setSelectedProduct(selectedOption);
        const product = products.find(p => p.id === selectedOption.value);
        const countingUnit = countingUnits.find(cu => cu.id === product.countingunitId);
        setCountingUnitName(countingUnit ? countingUnit.name : '');
    };

    const saveReceive = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/buyIn", {
                productId: selectedProduct.value,
                doc_number: doc_number || null,
                title: title,
                quantity: quantity,
                price: null,
                summary: null
            });
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (
        <div>
            <form onSubmit={saveReceive}>
                <br />
                <h1 className="title">ซื้อวัสดุเข้าคลัง</h1>
                <div className='card is-shadowless'>
                    <div className='card-content'>
                        <div className='content'>
                            <p className="has-text-centered" style={{ color: 'red' }}>{msg}</p>
                            <div div style={{ display: 'flex', gap: '10px' }}>
                                <div className='field' style={{ flex: 1 }}>
                                    <label className='label'>เลขที่เอกสาร</label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            value={doc_number}
                                            onChange={(e) => setDoc_number(e.target.value)}
                                            placeholder="กรุณากรอกชื่อ เลขที่เอกสาร"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='field' style={{ flex: 1 }}>
                                    <label className='label'>ชื่อรายการ</label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="กรุณากรอกชื่อ รายการสั่งซื้อ"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card is-shadowless" style={{ width: '99%' }}>
                    <div className="card-content">
                        <div className="content">
                            <p className="has-text-centered" style={{ color: 'red' }}>{msg}</p>
                            <div div style={{ display: 'flex', gap: '10px' }}>
                                <div className="field" style={{ flex: 1 }}>
                                    <label className="label">ชื่อสินค้า</label>
                                    <div className="control">
                                        <Select
                                            options={products.map(product => ({ value: product.id, label: product.name }))}
                                            onChange={handleProductChange}
                                        />
                                    </div>
                                </div>

                                <div className="field" style={{ flex: 1 }}>
                                    <label className="label">จำนวน</label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="number"
                                            placeholder="กรุณากรอกจำนวน"
                                            value={ quantity }
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value)) {
                                                    setQuantity(value);
                                                }
                                            }}
                                            min="1"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="field" style={{ flex: 1 }}>
                                    <label className="label">หน่วยนับ</label>
                                    <div className="control">
                                        {countingUnitName && (
                                            <input
                                                className="input"
                                                type="text"
                                                value={countingUnitName}
                                                readOnly
                                            />
                                        )}
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                </div >

                {/* ปุ่มกด */}
                <div div className="field is-grouped" >
                    <div className="control">
                        <button type="submit" className="button is-success" style={{ width: "120px" }}>
                            บันทึกข้อมูล
                        </button>
                    </div>
                    <div className="control">
                        <button type="button" className="button is-danger" style={{ width: "120px" }}>
                            ยกเลิก
                        </button>
                    </div>
                </div >
            </form>
        </div >
    )
}

export default FormBuyInProduct