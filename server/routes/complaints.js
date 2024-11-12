import express from 'express';
import Complaint from '../models/Complaint.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all complaints (admin only)
router.get('/all', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const complaints = await Complaint.find().populate('user', 'name email');
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's complaints
router.get('/', auth, async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user.id });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new complaint
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const complaint = new Complaint({
      title,
      description,
      category,
      user: req.user.id,
    });

    await complaint.save();
    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update complaint status (admin only)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    complaint.status = status;
    complaint.updatedAt = Date.now();

    await complaint.save();
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit feedback for a resolved complaint
router.post('/:id/feedback', auth, async (req, res) => {
  try {
    console.log(req);
    
    const { rating, comment } = req.body;
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    if (complaint.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (complaint.status !== 'Resolved') {
      return res.status(400).json({ message: 'Can only provide feedback for resolved complaints' });
    }

    complaint.feedback = { rating, comment };
    await complaint.save();
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;