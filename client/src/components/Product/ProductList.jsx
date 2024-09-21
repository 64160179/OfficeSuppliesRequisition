// import React, { useState, useEffect, useCallback } from "react";
import React from "react";
// import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import Swal from 'sweetalert2';
import '../../../src/App.css'

const ProductList = () => {
    const { user } = useSelector((state) => state.auth);
    // const [products, setProducts] = useState([]);
    // const [itemsPerPage, setItemsPerPage] = useState(10);
    // const [currentPage, setCurrentPage] = useState(1);

    return (
        <div>
            <br />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', width: '99%' }}>
                <h1 className="title">รายการวัสดุ - อุปกรณ์ (ยังไม่ได้ทำ)</h1>
                <span className="subtitle">จำนวนทั้งสิ้น: </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', width: '99%' }}>
                <Link to="/products/add" className="button is-link">
                    + เพิ่มวัสดุชิ้นใหม่
                </Link>

                {/* search bar */}
                <input
                    type="text"
                    className="input"
                    placeholder="ค้นหา ชื่อวัสดุ - อุปกรณ์"
                    style={{ flex: 1, marginLeft: '10px' }}
                // value={search}  // กำหนดค่า search ใน input
                // onChange={handleSearch} // ฟังก์ชันเรียกใช้งานเมื่อมีการกรอกข้อมูล
                />
            </div>

            <table className="location-table table is-striped">
                <thead>
                    <tr>
                    {user && user.role === "admin" && (
                            <th className="has-text-centered">BOX</th>
                        )}
                        <th>ลำดับ</th>
                        <th>รหัส</th>
                        <th>ชื่อ</th>
                        <th>จำนวน</th>
                        <th>หน่วยนับ</th>
                        <th>เพิ่มลงตระกร้า</th>
                        {user && user.role === "admin" && (
                            <th>สถานที่จัดเก็บ</th>
                        )}
                        {user && user.role === "admin" && (
                            <th className="has-text-centered">อื่น ๆ</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {user && user.role === "admin" && (
                            <td className="has-text-centered">
                                <input
                                    type="checkbox"
                                    // checked={product.visible}
                                    // onChange={() => toggleVisibility(product.uuid, product.visible)}
                                    style={{ transform: 'scale(1.5)' }}
                                />
                            </td>
                        )}
                        <td>id</td>
                        <td>code</td>
                        <td>name</td>
                        <td>quantity</td>
                        <td>countingUnit</td>
                        <td>add</td>
                        {user && user.role === "admin" && (
                            <td>location</td>
                        )}
                        {user && user.role === "admin" && (
                            <td className="has-text-centered">
                                <Link
                                    className="button is-small is-warning"
                                    style={{ width: '40px', }}
                                >
                                    <strong>แก้ไข</strong>
                                </Link>
                                <button

                                    className="button is-small is-danger"
                                    style={{ width: '40px', marginLeft: '10px' }}
                                >
                                    <strong>ลบ</strong>
                                </button>
                            </td>
                        )}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ProductList