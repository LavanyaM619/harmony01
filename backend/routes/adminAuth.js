const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const adminAuth = require('../middleware/auth');

const router = express.Router();

// Admin Sign-Up
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    let admin = await Admin.findOne({ email });

    if (admin) return res.status(400).json({ error: 'Admin already exists' });

    admin = new Admin({ email, password });
    await admin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error registering admin' });
  }
});

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id, role: 'admin' }, 'secretKey', { expiresIn: '1d' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Change Admin Password
router.post('/change-password', adminAuth, async (req, res) => {
  try {
    console.log('Change password request received');
    const { currentPassword, newPassword } = req.body;
    
    // Find admin by ID from the token
    console.log('Looking for admin with ID:', req.admin.id);
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      console.log('Admin not found in database');
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    // Verify current password
    console.log('Verifying current password');
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      console.log('Current password verification failed');
      return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    }

    // Update the password (the model's pre-save middleware will handle hashing)
    console.log('Updating password');
    admin.password = newPassword;
    
    // Save the changes
    console.log('Saving admin document');
    const savedAdmin = await admin.save();
    
    if (!savedAdmin) {
      console.log('Failed to save admin document');
      return res.status(500).json({ success: false, message: 'Failed to save password changes' });
    }

    console.log('Password successfully updated in database');
    res.json({ success: true, message: 'Password changed successfully' });
  } catch (err) {
    console.error('Password change error:', err);
    res.status(500).json({ success: false, message: 'Error changing password' });
  }
});

module.exports = router;
