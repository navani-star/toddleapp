import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';
import './Navbar.css';

const Navbar = ({ onCreateBoard, onSearch }) => {
    const [showModal, setShowModal] = useState(false);
    const [boardTitle, setBoardTitle] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedColor, setSelectedColor] = useState('#A7F0F9');

    const handleCreateBoard = () => {
        if (!boardTitle.trim()) {
            alert("Please enter a board name");
            return;
        }
        onCreateBoard(boardTitle,selectedColor);
        setBoardTitle("");
        setSelectedColor('#A7F0F9'); // Reset to default color
        setShowModal(false);
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch(query);
    };
    const colors = [
        '#A7F0F9',
        '#C5C5FC',
        '#D7FFC5',
        '#FFD3E8',
        '#FFDED6',
        '#E7D6FF'
    ];

    return (
        <div className="main">
            <header className="navbar">
                <div className="navbar-left">
                    <div className="brand-logo">
                        <span className="brand-icon">t</span> toddle
                    </div>
                </div>

                <div className="navbar-right">
                    <div className="search-box">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>

                    <button
                        className="create-board-btn"
                        onClick={() => setShowModal(true)}
                    >
                         Create new board
                    </button>

                    {/* Create Board Modal */}
                    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Add a name for your board</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Enter board name"
                                value={boardTitle}
                                onChange={(e) => setBoardTitle(e.target.value)}
                            />
                            <div className="color-picker">
                                {colors.map((color) => (
                                    <div
                                        key={color}
                                        className={`color-swatch ${selectedColor === color ? 'selected' : ''}`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => setSelectedColor(color)}
                                    />
                                ))}
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={handleCreateBoard}>
                                Create Board
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </header>
        </div>
    );
};

export default Navbar;