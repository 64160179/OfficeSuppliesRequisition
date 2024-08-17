import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddProduct = () => {
    const [name, setName] = useState("");
    const [unit, setUnit] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const saveProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/products", {
                name: name,
                unit: unit,
                quantity: quantity,
                category: category,
                location: location,
            });
            navigate("/products");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };
    return (
        <div>
            <br />
            <h1 className="title">เพิ่มวัสดุหรืออุปกรณ์ชิ้นใหม่</h1>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={saveProduct}>
                        <p className="has-text-centered" style={{ color: 'red' }}>{msg}</p>
                            <div className="field">
                                <label className="label">ชื่อวัสดุหรืออุปกรณ์</label>
                                <div className="control">
                                    <input className="input" 
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} 
                                    placeholder="Text input" 
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">หน่วยนับ</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select
                                            value={unit}
                                            onChange={(e) => setUnit(e.target.value)}
                                        >
                                            <option value="">- เลือกหน่วยนับ -</option>
                                            <option value="อัน">อัน</option>
                                            <option value="ตัว">ตัว</option>
                                            <option value="ด้าม">ด้าม</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">จำนวน</label>
                                <div className="control">
                                    <input className="input" 
                                    type="text" 
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    placeholder="Text input" 
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">หมวดหมู่</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        >
                                            <option value="">- เลือกหมวดหมู่ - </option>
                                            <option value="กบเหลา">กบเหลา</option>
                                            <option value="ปากกา">ปากกา</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">สถานที่จัดเก็บ</label>
                                <div className="control">
                                    <input className="input" 
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)} 
                                    placeholder="Text input" 
                                    />
                                </div>
                            </div>
                            <br />
                            <div className="field">
                                <div className="control">
                                    <button type="submit" className="button is-success">
                                        บันทึกข้อมูล
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormAddProduct