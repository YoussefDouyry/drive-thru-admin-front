import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, InputGroup, Dropdown, Card } from 'react-bootstrap';
import { FiSearch, FiEdit, FiTrash2, FiFilter, FiX, FiEye } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2'; // tout en haut du fichier !


export default function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ status: '', role: '', date: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/users');
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let results = users;
  
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      results = results.filter(user =>
        user.nom.toLowerCase().includes(lowerSearch) ||
        user.NomRespo.toLowerCase().includes(lowerSearch) ||
        user.teleRespo.toLowerCase().includes(lowerSearch) ||
        user.ville.toLowerCase().includes(lowerSearch) ||
        user.adresseComplet.toLowerCase().includes(lowerSearch)
      );
    }
  
    if (filters.status) {
      results = results.filter(user => user.status === filters.status);
    }
    if (filters.role) {
      results = results.filter(user => user.role === filters.role);
    }
    if (filters.date) {
      results = results.filter(user => new Date(user.createdAt) >= new Date(filters.date));
    }
    if (filters.ville) {
      results = results.filter(user => user.ville === filters.ville);
    }
    if (filters.NomRespo) {
      results = results.filter(user => user.NomRespo === filters.NomRespo);
    }
  
    setFilteredUsers(results);
  }, [searchTerm, filters, users]);
  

  const handleEdit = (user) => {
    setCurrentUser(user);
    setShowEditModal(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/users/${currentUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentUser)
      });
      if (!response.ok) throw new Error('Update Error');
      setUsers(users.map(user => user.id === currentUser.id ? currentUser : user));
      setShowEditModal(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };


const handleDelete = async (userId) => {
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
      popup: 'animated tada faster' // animation sympa
    }
  });

  if (result.isConfirmed) {
    try {
      await fetch(`http://localhost:3001/api/users/${userId}`, { method: 'DELETE' });
      setUsers(users.filter(user => user.id !== userId));
      Swal.fire('Deleted!', 'User has been deleted.', 'success');
    } catch (error) {
      console.error('Delete Error:', error);
      Swal.fire('Error!', 'There was a problem deleting the user.', 'error');
    }
  }
};

  const handleDetail = (user) => {
    setCurrentUser(user);
    setShowDetailModal(true);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilters({ status: '', role: '', date: '' });
  };

  return (
    <div className="card">
      <h5 className="card-header d-flex justify-content-between align-items-center">
        Users Management
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-2">
          <InputGroup style={{ minWidth: '190px' }}>
            <InputGroup.Text><FiSearch /></InputGroup.Text>
            <Form.Control
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {(searchTerm || filters.status || filters.role || filters.date || filters.NomRespo||filters.ville) && (
              <Button variant="outline-secondary" onClick={resetFilters}><FiX /></Button>
            )}
          </InputGroup>
          <Dropdown className="ms-2">
            <Dropdown.Toggle variant="outline-primary"><FiFilter className="me-1" /> Filters</Dropdown.Toggle>
            <Dropdown.Menu className="p-3" style={{ width: '300px' }}>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select value={filters.role} onChange={(e) => setFilters({ ...filters, role: e.target.value })}>
                  <option value="">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="user">User</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Date Joined After</Form.Label>
                <Form.Control type="date" value={filters.date} onChange={(e) => setFilters({ ...filters, date: e.target.value })} />
              </Form.Group>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </h5>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>Respo Name</th>
              <th>VILLE</th>
              <th>STATUS</th>
              <th>JOINED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td className="d-flex align-items-center">
                  <img src={`http://localhost:3001/${user.image}`} alt="Avatar" className="rounded-circle me-2" style={{ width: '36px', height: '36px', objectFit: 'cover' }} />
                  <strong>{user.nom}</strong>
                </td>
                <td>{user.NomRespo}</td>
                {/* <td>{user.role || 'User'}</td> */}
                <td>{user.ville}</td>
                <td>
                  <span className={`badge bg-${user.status === 'active' ? 'success' : user.status === 'inactive' ? 'secondary' : 'warning'}`}>{user.status?.toUpperCase()}</span>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="d-flex gap-1">
                    <Button variant="outline-primary" size="sm" onClick={() => handleDetail(user)}><FiEye size={14} /></Button>
                    <Button variant="outline-warning" size="sm" onClick={() => handleEdit(user)}><FiEdit size={14} /></Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(user.id)}><FiTrash2 size={14} /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="text-center py-4">
            <p className="text-muted">No users found matching your criteria</p>
            <Button variant="outline-primary" onClick={resetFilters}>Reset Filters</Button>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {currentUser && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  value={currentUser.nom}
                  onChange={(e) => setCurrentUser({ ...currentUser, nom: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Responsible Person</Form.Label>
                <Form.Control
                  type="text"
                  value={currentUser.NomRespo}
                  onChange={(e) => setCurrentUser({ ...currentUser, NomRespo: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  value={currentUser.teleRespo}
                  onChange={(e) => setCurrentUser({ ...currentUser, teleRespo: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  value={currentUser.ville}
                  onChange={(e) => setCurrentUser({ ...currentUser, ville: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Full Address</Form.Label>
                <Form.Control
                  type="text"
                  value={currentUser.adresseComplet}
                  onChange={(e) => setCurrentUser({ ...currentUser, adresseComplet: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={currentUser.status}
                  onChange={(e) => setCurrentUser({ ...currentUser, status: e.target.value })}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
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

      {/* Detail Modal */}
      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} centered>
        <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
          <Card className="p-4 text-center">
            {currentUser && (
              <>
                <img
                  src={`http://localhost:3001/${currentUser.image}`}
                  alt={currentUser.nom}
                  className="rounded-circle mx-auto mb-3"
                  style={{ width: '90px', height: '90px', objectFit: 'cover', border: '3px solid #eee' }}
                />
                <h5 className="mb-1"><strong>{currentUser.nom}</strong></h5>

                <div className="text-muted small mb-2">
                  <p><strong>Responsible:</strong> {currentUser.NomRespo}</p>
                  <p><strong>Phone:</strong> {currentUser.teleRespo}</p>
                  <p><strong>City:</strong> {currentUser.ville}</p>
                  <p><strong>Address:</strong> {currentUser.adresseComplet}</p>
                  <p><strong>Joined:</strong> {new Date(currentUser.createdAt).toLocaleDateString()}</p>
                </div>

                {/* Logo de l'entreprise */}
                {currentUser.logo && (
                  <div className="mb-3">
                    <img
                      src={`http://localhost:3001/${currentUser.logo}`}
                      alt="Company Logo"
                      className="mx-auto"
                      style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                    />
                  </div>
                )}

                {/* Badge Status */}
                <span className={`badge bg-${currentUser.status === 'active' ? 'success' : currentUser.status === 'inactive' ? 'secondary' : 'warning'} mb-3`}>
                  {currentUser.status?.toUpperCase()}
                </span>

                {/* Close Button */}
                <Button variant="outline-secondary" onClick={() => setShowDetailModal(false)}>
                  Close
                </Button>
              </>
            )}
          </Card>
        </motion.div>
      </Modal>

    </div>
  );
}
