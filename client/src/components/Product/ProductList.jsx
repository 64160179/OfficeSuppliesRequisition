import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import '../../../src/App.css'

const ProductList = () => {
    const { user } = useSelector((state) => state.auth);
    const [products, setProducts] = useState([]);
    const [countingUnits, setCountingUnits] = useState([]);
    const [storageLocations, setStorageLocations] = useState([]);
    const [search, setSearch] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false); // state สำหรับเปิด/ปิดโมดอล
    const [isCartHovered, setIsCartHovered] = useState(false);

    const getProducts = useCallback(async () => {
        const response = await axios.get(`http://localhost:5000/products?search=${search}`);
        setProducts(response.data);
    }, [search]);

    useEffect(() => {
        getProducts();
    }, [search, getProducts]); // โหลดข้อมูลใหม่เมื่อค่า search หรือ getUsers เปลี่ยนแปลง

    const handleSearch = (e) => {
        setSearch(e.target.value); // อัปเดตค่าการค้นหาเมื่อผู้ใช้กรอกข้อมูล
    };

    useEffect(() => {
        const fetchCountingUnits = async () => {
            try {
                const response = await axios.get('http://localhost:5000/countingUnits');
                setCountingUnits(response.data);
            } catch (error) {
                console.error('Error fetching counting units:', error);
            }
        };

        fetchCountingUnits();
    }, []);

    const countingUnitMap = countingUnits.reduce((map, countingUnit) => {
        map[countingUnit.id] = countingUnit.name;
        return map;
    }, {});

    useEffect(() => {
        const fetchStorageLocations = async () => {
            try {
                const response = await axios.get('http://localhost:5000/locations');
                setStorageLocations(response.data);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchStorageLocations();
    }, []);

    const locationMap = storageLocations.reduce((map, location) => {
        map[location.id] = location.name;
        return map;
    }, {});

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

    const deleteProduct = async (productId, productName) => {
        const result = await Swal.fire({
            title: 'คุณยืนยันที่จะลบ ?',
            text: `คุณยืนยันที่จะลบ ${productName} หรือไม่ ?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ใช่, ลบเลย !',
            cancelButtonText: 'ยกเลิก'
        });

        if (result.isConfirmed) {
            await axios.delete(`http://localhost:5000/products/${productId}`);
            getProducts();
            Swal.fire(
                'ลบแล้ว !',
                `${productName} ถูกลบเรียบร้อยแล้ว.`,
                'success'
            );
        }
    };

    // ฟังก์ชันเพิ่มสินค้าลงตะกร้า
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);
            let updatedCart;
            if (existingProduct) {
                updatedCart = prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                updatedCart = [...prevCart, { ...product, quantity: 1 }];
            }

            // บันทึกตะกร้าไว้ใน localStorage
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    // โหลดข้อมูลตะกร้าจาก localStorage เมื่อโหลดหน้าเว็บ
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    // ฟังก์ชันลบสินค้าจากตะกร้า
    const removeFromCart = (productId) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.filter((item) => item.id !== productId);
            // อัปเดต localStorage
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    // ฟังก์ชันเพิ่มจำนวนสินค้าในตะกร้า
    const increaseQuantity = (productId) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    // ฟังก์ชันลดจำนวนสินค้าในตะกร้า
    const decreaseQuantity = (productId) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    // ฟังก์ชันเปลี่ยนจำนวนสินค้าในตะกร้า
    const handleQuantityChange = (productId, newQuantity) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    // คำนวณจำนวนสินค้าทั้งหมดในตะกร้า
    const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <div>
            <br />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', width: '99%' }}>
                <h1 className="title">รายการวัสดุ - อุปกรณ์</h1>
                <span className="subtitle">จำนวนทั้งสิ้น:<strong> {products.length} </strong>ชิ้น</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', width: '99%' }}>
                {user && user.role === "admin" && (
                    <Link to="/products/add" className="button is-link" style={{ marginRight: '10px' }}>
                        + เพิ่มวัสดุชิ้นใหม่
                    </Link>
                )}

                {/* cart preview */}
                <div
                    className="cart-icon-container"
                    onMouseEnter={() => setIsCartHovered(true)}
                    onMouseLeave={() => setIsCartHovered(false)}
                >
                    {/* cart button */}
                    <button
                        className="floating-cart-btn" style={{ marginRight: '10px' }}
                        onClick={() => setIsCartOpen(true)}
                    >
                        🛒 {totalItemsInCart}
                    </button>
                    {isCartHovered && cart.length > 0 && (
                        <div className="cart-preview">
                            <ul>
                                {cart.map((item) => (
                                    <li key={item.id}>
                                        <span className="item-name">{item.name}</span>
                                        <span className="item-quantity">{item.quantity}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                {/* search Admin */}
                {user && user.role === "admin" && (
                    <input
                        type="text"
                        className="input"
                        placeholder="ค้นหา ชื่อวัสดุ - อุปกรณ์, หน่วยนับ, ที่จัดเก็บ"
                        style={{ flex: 1 }}
                        value={search}  // กำหนดค่า search ใน input
                        onChange={handleSearch} // ฟังก์ชันเรียกใช้งานเมื่อมีการกรอกข้อมูล
                    />
                )}

                {/* search User */}
                {user && user.role === "user" && (
                    <input
                        type="text"
                        className="input"
                        placeholder="ค้นหา รหัส, ชื่อวัสดุ - อุปกรณ์"
                        style={{ flex: 1 }}
                        value={search}  // กำหนดค่า search ใน input
                        onChange={handleSearch} // ฟังก์ชันเรียกใช้งานเมื่อมีการกรอกข้อมูล
                    />
                )}
            </div>

            <table className="location-table table is-striped">
                <thead>
                    <tr>

                        {user && user.role === "admin" && <th className="has-text-centered" style={{ width: '50px' }}>BOX</th>}

                        <th className="has-text-centered" style={{ width: '50px' }}>ลำดับ</th>

                        <th className="has-text-centered" style={{ width: '80px' }}>รหัส</th>

                        <th style={{ width: '200px' }}>ชื่อสินค้า</th>

                        <th className="has-text-centered" style={{ width: '80px' }}>คงเหลือ</th>

                        {user && user.role === "admin" && <th className="has-text-centered" style={{ width: '80px' }}>หน่วยนับ</th>}

                        <th className="has-text-centered" style={{ width: '120px' }}>เพิ่มลงตระกร้า</th>

                        {user && user.role === "admin" && <th className="has-text-centered" style={{ width: '150px' }}>ที่จัดเก็บ</th>}

                        {user && user.role === "admin" && <th className="has-text-centered" style={{ width: '100px' }}>อื่น ๆ</th>}
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.map((product) => (
                        <tr key={product.uuid}>

                            {user && user.role === "admin" &&
                                <td className="has-text-centered" style={{ width: '50px' }}>
                                    <input
                                        type="checkbox"
                                        checked={product.visible}
                                        onChange={() => toggleVisibility(product.uuid, product.visible)}
                                        style={{ transform: 'scale(1.5)' }}
                                    />
                                </td>
                            }

                            <td className="has-text-centered" style={{ width: '50px' }}>{product.id}</td>

                            <td className="has-text-centered" style={{ width: '100px' }}>{product.code}</td>

                            <td style={{ width: '200px' }}>{product.name}</td>

                            <td className="has-text-centered" style={{ width: '80px' }}>{product.quantity}</td>

                            {user && user.role === "admin" && <td className="has-text-centered" style={{ width: '80px' }}>{countingUnitMap[product.countingunitId]}</td>}

                            <td className="has-text-centered" style={{ width: '120px' }}>
                                <button onClick={() => addToCart(product)} className="button is-link" style={{ width: '80%', height: '30px' }}>
                                    + เพิ่ม
                                </button>
                            </td>

                            {user && user.role === "admin" && <td className="has-text-centered" style={{ width: '150px' }}>{locationMap[product.locationId]}</td>}

                            {user && user.role === "admin" && (
                                <td className="has-text-centered">
                                    <Link to={`/products/edit/${product.uuid}`}
                                        className="button is-small is-warning"
                                        style={{ width: '45px', }}
                                    >
                                        <strong>แก้ไข</strong>
                                    </Link>
                                    <button
                                        onClick={() => deleteProduct(product.uuid, product.name)}
                                        className="button is-small is-danger"
                                        style={{ width: '45px', marginLeft: '5px' }}
                                    >
                                        <strong>ลบ</strong>
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal ตะกร้าสินค้า */}
            <Modal
                isOpen={isCartOpen}
                onRequestClose={() => setIsCartOpen(false)}
                className="cart-modal"
                overlayClassName="cart-modal-overlay"
            >
                <strong><h2>🛒 ตะกร้าสินค้า 🛒</h2></strong>
                <br />
                {cart.length === 0 ? (
                    <div style={{ textAlign: 'center' }}>
                        <strong><p>ไม่มีสินค้าในตะกร้า</p></strong>
                    </div>
                ) : (
                    <table className='modal-like-table'>
                        <thead >
                            <tr>
                                <th className="item-name">ชื่อสินค้า</th>
                                <th className="item-quantity">จำนวน</th>
                                <th className="item-actions">อื่น ๆ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <tr key={item.id} className="cart-item">
                                        <td className="item-name">{item.name}</td>
                                        <td className="item-quantity">
                                            <div className="quantity-controls">
                                                <button className="decrease-btn" onClick={() => decreaseQuantity(item.id)} >-</button>
                                                <input
                                                    type="text"
                                                    value={item.quantity}
                                                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                                />
                                                <button className="increase-btn" onClick={() => increaseQuantity(item.id)} >+</button>
                                            </div>
                                        </td>
                                        <td className="item-actions">
                                            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>ลบ</button>
                                        </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}


                <div className="cart-footer">
                    {/* แสดงปุ่ม "ไปที่หน้า Checkout" เฉพาะเมื่อมีสินค้าในตะกร้า */}
                    {cart.length > 0 && (
                        <button className="checkout-btn">ไปที่หน้า Checkout</button>
                    )}
                    <button className="close-modal-btn" onClick={() => setIsCartOpen(false)}>
                        ปิด
                    </button>
                </div>
            </Modal>

            {/* start control page */}
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
            {/* end control page */}
        </div>
    )
}

export default ProductList