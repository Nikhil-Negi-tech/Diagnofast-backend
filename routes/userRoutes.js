const express = require('express');
const Disease = require('../models/Disease');
const Medicine = require('../models/Medicine');

const router = express.Router();

// Get all available symptoms
router.get('/symptoms', async (req, res) => {
  try {
    const diseases = await Disease.find({}, 'symptoms');
    const allSymptoms = new Set();
    
    diseases.forEach(disease => {
      disease.symptoms.forEach(symptom => {
        allSymptoms.add(symptom.toLowerCase().trim());
      });
    });

    const symptomList = Array.from(allSymptoms).sort();
    
    res.json({
      success: true,
      symptoms: symptomList,
      count: symptomList.length
    });
  } catch (error) {
    console.error('Error fetching symptoms:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch symptoms' 
    });
  }
});

// Diagnose based on selected symptoms
router.post('/diagnose', async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least one symptom'
      });
    }

    // Normalize symptoms
    const normalizedSymptoms = symptoms.map(s => s.toLowerCase().trim());

    // Find diseases that match the symptoms
    const matchingDiseases = await Disease.find({
      symptoms: { $in: normalizedSymptoms }
    });

    if (matchingDiseases.length === 0) {
      return res.json({
        success: true,
        results: [],
        message: 'No diseases found matching the selected symptoms'
      });
    }

    // Calculate match percentage and get medicines
    const results = await Promise.all(
      matchingDiseases.map(async (disease) => {
        const matchedSymptoms = disease.symptoms.filter(symptom => 
          normalizedSymptoms.includes(symptom.toLowerCase())
        );
        
        const matchPercentage = Math.round(
          (matchedSymptoms.length / disease.symptoms.length) * 100
        );

        // Get medicines for this disease
        const medicineData = await Medicine.findOne({ disease: disease.name });

        return {
          disease: {
            id: disease._id,
            name: disease.name,
            description: disease.description,
            symptoms: disease.symptoms,
            matchedSymptoms,
            matchPercentage
          },
          medicines: medicineData ? medicineData.medicines : []
        };
      })
    );

    // Sort by match percentage (highest first)
    results.sort((a, b) => b.disease.matchPercentage - a.disease.matchPercentage);

    res.json({
      success: true,
      results,
      totalMatches: results.length,
      selectedSymptoms: normalizedSymptoms
    });

  } catch (error) {
    console.error('Error in diagnosis:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process diagnosis'
    });
  }
});

// Get disease details by ID
router.get('/disease/:id', async (req, res) => {
  try {
    const disease = await Disease.findById(req.params.id);
    
    if (!disease) {
      return res.status(404).json({
        success: false,
        message: 'Disease not found'
      });
    }

    const medicines = await Medicine.findOne({ disease: disease.name });

    res.json({
      success: true,
      disease,
      medicines: medicines ? medicines.medicines : []
    });
  } catch (error) {
    console.error('Error fetching disease:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch disease details'
    });
  }
});

module.exports = router;
