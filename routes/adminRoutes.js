const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const Disease = require('../models/Disease');
const Medicine = require('../models/Medicine');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    // Find admin
    const admin = await Admin.findOne({ username });
    if (!admin || !admin.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isValidPassword = await admin.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { adminId: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
});

// Create initial admin (only if no admins exist)
router.post('/setup', async (req, res) => {
  try {
    const adminCount = await Admin.countDocuments();
    
    if (adminCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Admin already exists'
      });
    }

    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({
        success: false,
        message: 'Username, password, and email are required'
      });
    }

    const admin = new Admin({
      username,
      passwordHash: password, // Will be hashed by pre-save middleware
      email
    });

    await admin.save();

    res.json({
      success: true,
      message: 'Admin created successfully'
    });

  } catch (error) {
    console.error('Admin setup error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create admin'
    });
  }
});

// Protected routes (require JWT)

// Get all diseases
router.get('/diseases', authenticateToken, async (req, res) => {
  try {
    const diseases = await Disease.find().sort({ name: 1 });
    
    // Get medicine count for each disease
    const diseasesWithMedicines = await Promise.all(
      diseases.map(async (disease) => {
        const medicineData = await Medicine.findOne({ disease: disease.name });
        return {
          ...disease.toObject(),
          medicineCount: medicineData ? medicineData.medicines.length : 0
        };
      })
    );

    res.json({
      success: true,
      diseases: diseasesWithMedicines,
      total: diseases.length
    });
  } catch (error) {
    console.error('Error fetching diseases:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch diseases'
    });
  }
});

// Add new disease
router.post('/disease', authenticateToken, async (req, res) => {
  try {
    const { name, symptoms, description } = req.body;

    if (!name || !symptoms || !description) {
      return res.status(400).json({
        success: false,
        message: 'Name, symptoms, and description are required'
      });
    }

    if (!Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one symptom is required'
      });
    }

    // Check if disease already exists
    const existingDisease = await Disease.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (existingDisease) {
      return res.status(400).json({
        success: false,
        message: 'Disease with this name already exists'
      });
    }

    const disease = new Disease({
      name: name.trim(),
      symptoms: symptoms.map(s => s.toLowerCase().trim()),
      description: description.trim()
    });

    await disease.save();

    res.status(201).json({
      success: true,
      disease,
      message: 'Disease added successfully'
    });

  } catch (error) {
    console.error('Error adding disease:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add disease'
    });
  }
});

// Update disease
router.put('/disease/:id', authenticateToken, async (req, res) => {
  try {
    const { name, symptoms, description } = req.body;
    const diseaseId = req.params.id;

    const disease = await Disease.findById(diseaseId);
    if (!disease) {
      return res.status(404).json({
        success: false,
        message: 'Disease not found'
      });
    }

    // Update fields if provided
    if (name) disease.name = name.trim();
    if (symptoms && Array.isArray(symptoms)) {
      disease.symptoms = symptoms.map(s => s.toLowerCase().trim());
    }
    if (description) disease.description = description.trim();

    await disease.save();

    res.json({
      success: true,
      disease,
      message: 'Disease updated successfully'
    });

  } catch (error) {
    console.error('Error updating disease:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update disease'
    });
  }
});

// Delete disease
router.delete('/disease/:id', authenticateToken, async (req, res) => {
  try {
    const disease = await Disease.findById(req.params.id);
    if (!disease) {
      return res.status(404).json({
        success: false,
        message: 'Disease not found'
      });
    }

    // Also delete associated medicines
    await Medicine.deleteOne({ disease: disease.name });
    await Disease.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Disease and associated medicines deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting disease:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete disease'
    });
  }
});

// Get medicines for a disease
router.get('/medicines/:diseaseName', authenticateToken, async (req, res) => {
  try {
    const medicines = await Medicine.findOne({ disease: req.params.diseaseName });
    
    res.json({
      success: true,
      medicines: medicines ? medicines.medicines : [],
      disease: req.params.diseaseName
    });
  } catch (error) {
    console.error('Error fetching medicines:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch medicines'
    });
  }
});

// Add or update medicines for a disease
router.post('/medicines', authenticateToken, async (req, res) => {
  try {
    const { disease, medicines } = req.body;

    if (!disease || !medicines || !Array.isArray(medicines)) {
      return res.status(400).json({
        success: false,
        message: 'Disease name and medicines array are required'
      });
    }

    // Validate medicine objects
    for (const med of medicines) {
      if (!med.name || !med.type || !med.dosage) {
        return res.status(400).json({
          success: false,
          message: 'Each medicine must have name, type, and dosage'
        });
      }
    }

    // Check if disease exists
    const diseaseExists = await Disease.findOne({ name: disease });
    if (!diseaseExists) {
      return res.status(400).json({
        success: false,
        message: 'Disease not found. Please add the disease first.'
      });
    }

    // Update or create medicine record
    const medicineRecord = await Medicine.findOneAndUpdate(
      { disease },
      { disease, medicines },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      medicines: medicineRecord,
      message: 'Medicines updated successfully'
    });

  } catch (error) {
    console.error('Error updating medicines:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update medicines'
    });
  }
});

// Get dashboard statistics
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const [diseaseCount, medicineRecords, totalSymptoms] = await Promise.all([
      Disease.countDocuments(),
      Medicine.countDocuments(),
      Disease.aggregate([
        { $unwind: '$symptoms' },
        { $group: { _id: '$symptoms' } },
        { $count: 'total' }
      ])
    ]);

    const totalMedicines = await Medicine.aggregate([
      { $unwind: '$medicines' },
      { $count: 'total' }
    ]);

    res.json({
      success: true,
      stats: {
        diseases: diseaseCount,
        medicineRecords: medicineRecords,
        totalMedicines: totalMedicines[0]?.total || 0,
        uniqueSymptoms: totalSymptoms[0]?.total || 0
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics'
    });
  }
});

module.exports = router;
