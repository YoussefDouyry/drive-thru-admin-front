import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, InputGroup, Dropdown, Card } from 'react-bootstrap';
import { FiSearch, FiEdit, FiTrash2, FiFilter, FiX, FiEye } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

export default function ProductsManagement() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ status: '', category: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/products');
                if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        let results = products;

        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            results = results.filter(product =>
                product.title.toLowerCase().includes(lowerSearch) ||
                product.category.toLowerCase().includes(lowerSearch)
            );
        }

        if (filters.status) {
            results = results.filter(product => product.status === filters.status);
        }
        if (filters.category) {
            results = results.filter(product => product.category === filters.category);
        }

        setFilteredProducts(results);
    }, [searchTerm, filters, products]);

    const handleEdit = (product) => {
        setCurrentProduct(product);
        setShowEditModal(true);
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/products/${currentProduct.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentProduct)
            });
            if (!response.ok) throw new Error('Update Error');
            setProducts(products.map(product => product.id === currentProduct.id ? currentProduct : product));
            setShowEditModal(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDelete = async (productId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            reverseButtons: true,
            backdrop: true,
            customClass: {
                popup: 'animated tada faster'
            }
        });

        if (result.isConfirmed) {
            try {
                await fetch(`http://localhost:3001/api/products/${productId}`, { method: 'DELETE' });
                setProducts(products.filter(product => product.id !== productId));
                Swal.fire('Deleted!', 'Product has been deleted.', 'success');
            } catch (error) {
                console.error('Delete Error:', error);
                Swal.fire('Error!', 'There was a problem deleting the product.', 'error');
            }
        }
    };

    const handleDetail = (product) => {
        setCurrentProduct(product);
        setShowDetailModal(true);
    };

    const resetFilters = () => {
        setSearchTerm('');
        setFilters({ status: '', category: '' });
    };

    return (
        <div className="card">
            <h5 className="card-header d-flex justify-content-between align-items-center">
                Products Management
                <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-2">
                    <InputGroup style={{ minWidth: '190px' }}>
                        <InputGroup.Text><FiSearch /></InputGroup.Text>
                        <Form.Control
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {(searchTerm || filters.status || filters.category) && (
                            <Button variant="outline-secondary" onClick={resetFilters}><FiX /></Button>
                        )}
                    </InputGroup>
                    <Dropdown className="ms-2">
                        <Dropdown.Toggle variant="outline-primary"><FiFilter className="me-1" /> Filters</Dropdown.Toggle>
                        <Dropdown.Menu className="p-3" style={{ width: '250px' }}>
                            <Form.Group className="mb-3">
                                <Form.Label>Status</Form.Label>
                                <Form.Select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
                                    <option value="">All Status</option>
                                    <option value="in stock">In Stock</option>
                                    <option value="low stock">Low Stock</option>
                                    <option value="out of stock">Out of Stock</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={filters.category}
                                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                                />
                            </Form.Group>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </h5>

            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>IMAGE</th>
                            <th>TITLE</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>STATUS</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product.id}>
                                <td>
                                    <img src={`http://localhost:3001/${product.image}`} alt={product.title} className="rounded" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                                </td>
                                <td><strong>{product.title}</strong></td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>
                                    <span className={`badge bg-${product.status === 'in stock' ? 'success' : product.status === 'low stock' ? 'warning' : 'danger'}`}>
                                        {product.status?.toUpperCase()}
                                    </span>
                                </td>
                                <td>
                                    <div className="d-flex gap-1">
                                        <Button variant="outline-primary" size="sm" onClick={() => handleDetail(product)}><FiEye size={14} /></Button>
                                        <Button variant="outline-warning" size="sm" onClick={() => handleEdit(product)}><FiEdit size={14} /></Button>
                                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(product.id)}><FiTrash2 size={14} /></Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-4">
                        <p className="text-muted">No products found matching your criteria</p>
                        <Button variant="outline-primary" onClick={resetFilters}>Reset Filters</Button>
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {currentProduct && (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={currentProduct.title}
                                    onChange={(e) => setCurrentProduct({ ...currentProduct, title: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={currentProduct.price}
                                    onChange={(e) => setCurrentProduct({ ...currentProduct, price: parseFloat(e.target.value) })}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={currentProduct.category}
                                    onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Status</Form.Label>
                                <Form.Select
                                    value={currentProduct.status}
                                    onChange={(e) => setCurrentProduct({ ...currentProduct, status: e.target.value })}
                                >
                                    <option value="in stock">In Stock</option>
                                    <option value="low stock">Low Stock</option>
                                    <option value="out of stock">Out of Stock</option>
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} centered>
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        whileHover={{ scale: 1.02, boxShadow: "0px 10px 20px rgba(0,0,0,0.15)" }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card
                            className="h-100 border-0 rounded-4 shadow-sm d-flex flex-column justify-content-between"
                            style={{ height: '500px', overflow: 'hidden' }}
                        >
                            {currentProduct && (
                                <>
                                    {/* Header */}
                                    <div className="card-body text-center">
                                        <h5 className="card-title mb-2">{currentProduct.title}</h5>
                                        <h6 className="card-subtitle text-muted mb-4">{currentProduct.description}</h6>
                                    </div>

                                    {/* Image Middle */}
                                    <div className="d-flex justify-content-center align-items-center flex-grow-1">
                                        <img
                                            src={`http://localhost:3001/${currentProduct.image}`}
                                            alt={currentProduct.title}
                                            className="img-fluid my-3 rounded"
                                            style={{ maxHeight: '200px', objectFit: 'cover' }}
                                        />
                                    </div>

                                    {/* Footer */}
                                    <div className="card-footer bg-white text-center border-0">
                                        <p className="card-text mb-2">
                                            <strong>Prix:</strong> ${currentProduct.price}
                                        </p>
                                        <Button variant="outline-secondary" onClick={() => setShowDetailModal(false)}>
                                            Fermer
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Card>
                    </motion.div>
                </motion.div>
            </Modal>
        </div>
    );
}
