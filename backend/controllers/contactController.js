const Contact = require('../models/Contact');

// ── POST /api/contact ─────────────────────────────────────────────────────────
/**
 * Submit a new contact message.
 * Validates on the server side (mirrors front-end rules) and saves to MongoDB.
 */
exports.submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Server-side validation (belt-and-suspenders — Mongoose also validates)
    const errors = {};
    if (!name?.trim())    errors.name    = 'Name is required';
    if (!email?.trim())   errors.email   = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Invalid email address';
    if (!subject?.trim()) errors.subject = 'Subject is required';
    if (!message?.trim()) errors.message = 'Message is required';
    else if (message.trim().length < 20) errors.message = 'Message must be at least 20 characters';

    if (Object.keys(errors).length) {
      return res.status(422).json({ success: false, errors });
    }

    const contact = await Contact.create({
      name:      name.trim(),
      email:     email.trim().toLowerCase(),
      subject:   subject.trim(),
      message:   message.trim(),
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
    });

    return res.status(201).json({
      success: true,
      message: "Message received! I'll get back to you within 24 hours.",
      id: contact._id,
    });
  } catch (err) {
    // Mongoose validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.fromEntries(
        Object.entries(err.errors).map(([k, v]) => [k, v.message])
      );
      return res.status(422).json({ success: false, errors });
    }
    console.error('[submitContact]', err);
    return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};

// ── GET /api/contact ──────────────────────────────────────────────────────────
/**
 * Admin: list messages with pagination & optional status filter.
 * Query params: ?page=1&limit=20&status=unread
 */
exports.getAllMessages = async (req, res) => {
  try {
    const page   = Math.max(1, parseInt(req.query.page)  || 1);
    const limit  = Math.min(100, parseInt(req.query.limit) || 20);
    const skip   = (page - 1) * limit;
    const filter = {};

    if (req.query.status && ['unread','read','replied','archived'].includes(req.query.status)) {
      filter.status = req.query.status;
    }

    const [messages, total] = await Promise.all([
      Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Contact.countDocuments(filter),
    ]);

    return res.json({
      success: true,
      data: messages,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error('[getAllMessages]', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// ── PATCH /api/contact/:id/status ─────────────────────────────────────────────
/**
 * Admin: update the status of a message.
 * Body: { "status": "read" | "replied" | "archived" | "unread" }
 */
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['unread', 'read', 'replied', 'archived'];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${allowed.join(', ')}`,
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Message not found.' });
    }

    return res.json({ success: true, data: contact });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid message ID.' });
    }
    console.error('[updateStatus]', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// ── DELETE /api/contact/:id ───────────────────────────────────────────────────
/**
 * Admin: permanently delete a message.
 */
exports.deleteMessage = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Message not found.' });
    }

    return res.json({ success: true, message: 'Message deleted.' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid message ID.' });
    }
    console.error('[deleteMessage]', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};