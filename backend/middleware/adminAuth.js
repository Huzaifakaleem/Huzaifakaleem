/**
 * Lightweight admin guard using a secret API key.
 * Set ADMIN_API_KEY in your .env file.
 *
 * Usage in requests:
 *   Header: x-admin-key: <your_secret>
 *
 * For production you can swap this with JWT / NextAuth / session auth.
 */
exports.adminAuth = (req, res, next) => {
  const key = req.headers['x-admin-key'];

  if (!process.env.ADMIN_API_KEY) {
    console.error('❌ ADMIN_API_KEY is not set — denying all admin access.');
    return res.status(401).json({ success: false, message: 'Unauthorized.' });
  }

  if (!key || key !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ success: false, message: 'Unauthorized.' });
  }

  next();
};