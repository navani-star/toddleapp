import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import Navbar from './Compoents/Navbar.jsx'
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Myboard from './Compoents/Myboard.jsx';

function App() {
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: 'Earth Changes and Journeys',
      color: '#B2EBF2',
      imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      content: 'Tracking environmental changes and beautiful destinations',
      likes: 0,
      isBookmarked: false
    },
    {
      id: 2,
      title: 'Eating Right',
      color: '#FFF9C4',
      imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      content: 'Healthy recipes and nutrition tips',
      likes: 0,
      isBookmarked: false
    },

    {
      id: 3,
      title: 'Eating Right',
      color: '#FFF9C4',
      imageUrl: 'https://images.pexels.com/photos/18148936/pexels-photo-18148936.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      content: 'Healthy recipes and nutrition tips',
      likes: 0,
      isBookmarked: false
    },

    {
      id: 4,
      title: 'Eating Right',
      color: '#FFF9C4',
      imageUrl: 'https://images.pexels.com/photos/18148937/pexels-photo-18148937/free-photo-of-vintage-tram-on-a-street.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      content: 'Healthy recipes and nutrition tips',
      likes: 8,
      isBookmarked: false
    }

  ]);

  const handleLike = (boardId) => {
    setBoards(boards.map(board =>
      board.id === boardId ? { ...board, likes: board.likes + 1 } : board
    ));
  };


  const handleBookmark = (boardId) => {
    setBoards(boards.map(board =>
      board.id === boardId ? { ...board, isBookmarked: !board.isBookmarked } : board
    ));
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [showMenu, setShowMenu] = useState(null);
  const [editingBoard, setEditingBoard] = useState(null);

  const createBoard = (title,color) => {
    const newBoard = {
      id: Date.now(),
      title,
      color: color,
      imageUrl: '',
      content: '',
      likes: 0,
      isBookmarked: false


    };
    setBoards([...boards, newBoard]);
  };

  const saveBoard = () => {
    setBoards(boards.map(b => b.id === editingBoard.id ? editingBoard : b));
    setEditingBoard(null);
  };

  const deleteBoard = (boardId) => {
    setBoards(boards.filter(board => board.id !== boardId));
    setShowMenu(null);
  };

  const filteredBoards = boards.filter(board =>
    board?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App p-4">
      
      <Navbar onSearch={setSearchTerm} onCreateBoard={createBoard} />
      <Myboard />

      <div className="d-flex gap-3 flex-wrap mt-3">
        {filteredBoards.map(board => (
          <div
            key={board.id}
            className="p-3 rounded border position-relative"
            style={{
              backgroundColor: board.color,
              width: '250px',
              minHeight: '200px'
            }}
          >
            {board.imageUrl && (
              <img
                src={board.imageUrl}
                alt={board.title}
                className="img-fluid rounded-top mb-2"
                style={{
                  height: '150px',
                  objectFit: 'cover',
                  width: '100%'
                }}
              />
            )}

            <div className="d-flex justify-content-between align-items-center">
              <h6 className="mb-0">{board.title}</h6>
            </div>

            {board.content && (
              <p className="mt-2 mb-0 small">{board.content}</p>
            )}

            {/* Add Like and Bookmark buttons here */}
            <div className="d-flex justify-content-between align-items-center mt-2">
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleLike(board.id)}
                >
                  ♥ {board.likes}
                </button>
                <button
                  className="btn btn-sm btn-outline-warning"
                  onClick={() => handleBookmark(board.id)}
                >
                  {board.isBookmarked ? '🔖' : '📑'}
                </button>
              </div>

              <button
                className="btn btn-light btn-sm"
                onClick={() => setShowMenu(board.id)}
              >
                ⋮
              </button>
            </div>

            {showMenu === board.id && (
              <div className="position-absolute bg-white border rounded shadow p-2"
                style={{ right: 10, top: 30 }}>
                <button
                  className="btn btn-sm btn-outline-secondary w-100 mb-1"
                  onClick={() => setEditingBoard(board)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger w-100"
                  onClick={() => deleteBoard(board.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <Modal show={!!editingBoard} onHide={() => setEditingBoard(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editingBoard?.title || ''}
                onChange={(e) => setEditingBoard({ ...editingBoard, title: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => {const file = e.target.files[0];
                  if (file) {
                    const imageUrl = URL.createObjectURL(file);
                    setEditingBoard({
                      ...editingBoard,
                      imageFile: file,  // Store the actual file
                      imageUrl: imageUrl  // Temporary URL for preview
                    });
                  }
                }}
              />
              {/* Image preview */}
              {editingBoard?.imageUrl && (
                <img
                  src={editingBoard.imageUrl}
                  alt="Preview"
                  style={{ marginTop: '10px', maxHeight: '200px' }}
                />
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editingBoard?.content || ''}
                onChange={(e) => setEditingBoard({ ...editingBoard, content: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="color"
                value={editingBoard?.color || '#E0E0E0'}
                onChange={(e) => setEditingBoard({ ...editingBoard, color: e.target.value })}
               
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditingBoard(null)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveBoard}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default App;
