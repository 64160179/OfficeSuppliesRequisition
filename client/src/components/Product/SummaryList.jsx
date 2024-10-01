import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import '../../App.css'

const SummaryList = () => {
    const [products, setProducts] = useState([]);
    const [currentDate, setCurrentDate] = useState('');

    const getProducts = async () => {
        // โค้ดการดึงข้อมูลสินค้าจากฐานข้อมูล
        const response = await axios.get(`http://localhost:5000/products`);
        setProducts(response.data);
    };

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        setCurrentDate(formattedDate);
    }, []);

    return (
        <div>
            <br />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 className="title">สรุปสินค้าคงเหลือ</h1>
                <span>{currentDate}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', width: '99%' }}>
                <Link to="/products/buyin" className="button is-link" style={{ marginRight: '10px' }}>
                    + ซื้อวัสดุเข้าคลัง
                </Link>
                <input
                        type="text"
                        className="input"
                        placeholder="ค้นหา รหัส และ ชื่อวัสดุ - อุปกรณ์"
                        style={{ flex: 1 }}
                        // value={search}  // กำหนดค่า search ใน input
                        // onChange={handleSearch} // ฟังก์ชันเรียกใช้งานเมื่อมีการกรอกข้อมูล
                    />
            </div>
            <table className="table is-bordered  is-fullwidth " style={{ width: '99%' }}>
                <thead>
                    <tr>
                        <th className="has-text-centered" style={{ width: '70px', verticalAlign: 'middle', backgroundColor: "rgb(255,255,204)" }} rowSpan="2">ลำดับ</th>
                        <th className="has-text-centered" style={{ width: '400px', backgroundColor: "rgb(255,255,204)" }} colSpan="2" rowSpan="1">รายการ</th>
                        <th colSpan="3" className="has-text-centered" style={{ color: 'blue', backgroundColor: "rgb(226,239,217)" }}>รับ</th>
                        <th colSpan="3" className="has-text-centered" style={{ backgroundColor: "rgb(252,225,214)" }}>จ่าย</th>
                        <th colSpan="3" className="has-text-centered" style={{ color: 'red', backgroundColor: "rgb(255,255,204)" }}>คงเหลือ</th>
                    </tr>
                    <tr>
                        {/* รายการ */}
                        <th className="has-text-centered" style={{ width: '80px', backgroundColor: "rgb(255,255,204)" }}>รหัส</th>
                        <th className="has-text-centered" style={{ width: '300px', backgroundColor: "rgb(255,255,204)" }}>ชื่อวัสดุ - อุปกรณ์</th>
                        {/* รับ */}
                        <th className="has-text-centered" style={{ color: 'blue', backgroundColor: "rgb(226,239,217)" }}>จำนวน</th>
                        <th className="has-text-centered" style={{ color: 'blue', backgroundColor: "rgb(226,239,217)" }}>ราคา</th>
                        <th className="has-text-centered" style={{ color: 'blue', backgroundColor: "rgb(226,239,217)" }}>รวม</th>
                        {/* จ่าย */}
                        <th className="has-text-centered" style={{ backgroundColor: "rgb(252,225,214)" }}>จำนวน</th>
                        <th className="has-text-centered" style={{ backgroundColor: "rgb(252,225,214)" }}>ราคา</th>
                        <th className="has-text-centered" style={{ backgroundColor: "rgb(252,225,214)" }}>รวม</th>
                        {/* คงเหลือ */}
                        <th className="has-text-centered" style={{ color: 'red', backgroundColor: "rgb(255,255,204)" }}>จำนวน</th>
                        <th className="has-text-centered" style={{ color: 'red', backgroundColor: "rgb(255,255,204)" }}>ราคา</th>
                        <th className="has-text-centered" style={{ color: 'red', backgroundColor: "rgb(255,255,204)" }}>รวม</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.uuid}>
                            <td className="has-text-centered">{product.id}</td>
                            <td className="has-text-centered">{product.code}</td>
                            <td style={{ textDecoration: "underline", textDecorationColor: "#0000CC" }}>
                                <Link to={`/products/detail/${product.uuid}`} style={{ color: '#0000CC' }}>{product.name}</Link>
                            </td>
                            {/* รับ */}
                            <td className="has-text-centered" style={{ color: 'blue' }}>10.00</td>
                            <td className="has-text-centered" style={{ color: 'blue' }}>100.00</td>
                            <td className="has-text-centered" style={{ color: 'blue' }}>1000.00</td>
                            {/* จ่าย */}
                            <td className="has-text-centered">5.00</td>
                            <td className="has-text-centered">50.00</td>
                            <td className="has-text-centered">250.00</td>
                            {/* คงเหลือ */}
                            <td className="has-text-centered" style={{ color: 'red' }}>5.00</td>
                            <td className="has-text-centered" style={{ color: 'red' }}>50.00</td>
                            <td className="has-text-centered" style={{ color: 'red' }}>750.00</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default SummaryList