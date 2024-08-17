import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from "axios";
// import { IoSearch } from "react-icons/io5";

const ProductList = () => {
    const { user } = useSelector((state) => state.auth);
    const [products, setProducts] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
    };

    const deleteProduct = async (productId, productName) => {
        const confirmDelete = window.confirm(`คุณยืนยันที่จะลบ ${productName} หรือไม่ ?`);
        if (confirmDelete) {
            await axios.delete(`http://localhost:5000/products/${productId}`);
            getProducts();
        }
    };

    const toggleVisibility = async (productId, currentVisibility) => {
        try {
            await axios.patch(`http://localhost:5000/products/visibility/${productId}`, {
                visible: !currentVisibility
            });
            getProducts(); // Refresh the product list
        } catch (error) {
            console.error('Error updating product visibility:', error);
        }
    };

    // คำนวณรายการวัสดุที่จะแสดงในหน้าปัจจุบัน
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

    // คำนวณจำนวนหน้าทั้งหมด
    const totalPages = Math.ceil(products.length / itemsPerPage);

    // ฟังก์ชั่นเปลี่ยนหน้า
    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <div>
            <br />
            <h1 className="title">วัสดุ - อุปกรณ์ (เหลือ search filter)</h1>

            {user && user.role === "admin" && (
                <div>
                    <Link to="/products/add" className="button is-warning mb-2">
                        <strong>+ ซื้อของเข้าคลัง (ยังไม่ได้ทำ)</strong>
                    </Link>
                    <Link to="/products/add" className="button is-success mb-2" style={{ marginLeft: '10px' }}>
                        <strong>+ เพิ่มวัสดุชิ้นใหม่</strong>
                    </Link>
                </div>
            )}
            <div className="field has-addons">
                <div className="control" style={{ width: '99%' }}>
                    {/* <IoSearch className='icon' /> */}
                    <input className="input" type="text" placeholder="กรอกคำที่ต้องการค้นหา" style={{ width: '100%' }} />
                </div>
            </div>
            <table className='table is-striped' style={{ width: '99%' }}>
                <thead>
                    <tr>
                        {user && user.role === "admin" && (
                            <th className="has-text-centered">BOX</th>
                        )}
                        <th>ลำดับ</th>
                        <th>รหัส</th>
                        <th>ชื่อ</th>
                        <th>หน่วยนับ</th>
                        <th>จำนวน</th>
                        <th>หมวดหมู่</th>
                        {user && user.role === "admin" && (
                            <th>สถานที่จัดเก็บ</th>
                        )}
                        {user && user.role === "admin" && (
                            <th className="has-text-centered">ยังไม่ได้ทำแก้ไข</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.map((product, index) => (
                        <tr key={product.uuid}>
                            {user && user.role === "admin" && (
                                <td className="has-text-centered">
                                    <input
                                        type="checkbox"
                                        checked={product.visible}
                                        onChange={() => toggleVisibility(product.uuid, product.visible)}
                                        style={{ transform: 'scale(1.5)' }}
                                    />
                                </td>
                            )}
                            <td>{indexOfFirstItem + product.id}</td>
                            <td></td>
                            <td>{product.name}</td>
                            <td>{product.unit}</td>
                            <td>{product.quantity}</td>
                            <td>{product.category}</td>
                            {user && user.role === "admin" && (
                                <td>{product.location}</td>
                            )}
                            {user && user.role === "admin" && (
                                <td className="has-text-centered">
                                    <Link to={`/products/edit/${product.uuid}`} 
                                    className="button is-small is-warning"
                                    style={{ width: '80px', }}
                                    >
                                        <strong>แก้ไข</strong>
                                    </Link>
                                    <button
                                        onClick={() => deleteProduct(product.uuid, product.name)}
                                        className="button is-small is-danger"
                                        style={{ width: '80px', marginLeft: '10px' }}
                                    >
                                        <strong>ลบ</strong>
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '99%' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <label htmlFor="itemsPerPage">แสดง : </label>
                    <select
                        id="itemsPerPage"
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setCurrentPage(1); // รีเซ็ตหน้าปัจจุบันเมื่อเปลี่ยนจำนวนการแสดงผล
                        }}
                        style={{ padding: '5px', margin: '2px', border: '1px solid #ccc', borderRadius: '5px', width: '80px' }}
                    >
                        <option value={10} className="has-text-centered">10</option>
                        <option value={20} className="has-text-centered">20</option>
                        <option value={100} className="has-text-centered">100</option>
                        <option value={150} className="has-text-centered">150</option>
                        <option value={200} className="has-text-centered">200</option>
                    </select>
                </div>

                <div style={{ fontWeight: 'bold' }}>
                    หน้า {currentPage} จาก {totalPages}
                </div>

                <div style={{ display: 'flex', gap: '5px' }}>
                    <button
                        className="button is-warning"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        style={{ width: '100px', padding: '5px', margin: '2px', border: '1px solid #ccc', borderRadius: '5px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                    >
                        ก่อนหน้า
                    </button>
                    <button
                        className="button is-success"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        style={{ width: '100px', padding: '5px', margin: '2px', border: '1px solid #ccc', borderRadius: '5px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                    >
                        ถัดไป
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductList;
