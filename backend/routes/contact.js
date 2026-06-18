const express = require('express');
const router = express.Router();
const {
  submitContact,
  getAllMessages,
  updateStatus,
  deleteMessage,
} = require('../controllers/contactController');
const { adminAuth } = require('../middleware/adminAuth');

// ── Public ────────────────────────────────────────────────────────────────────
// POST /api/contact  →  submit a new message
router.post('/', submitContact);

// ── Admin (protected) ─────────────────────────────────────────────────────────
// GET  /api/contact           →  list all messages (paginated)
router.get('/', adminAuth, getAllMessages);

// PATCH /api/contact/:id/status  →  mark read / replied / archived
router.patch('/:id/status', adminAuth, updateStatus);

// DELETE /api/contact/:id        →  delete a message
router.delete('/:id', adminAuth, deleteMessage);

module.exports = router;