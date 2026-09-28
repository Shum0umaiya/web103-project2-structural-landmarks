const express = require('express');
const pool = require('../config/database');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM landmarks ORDER BY id'
    );

    const landmarks = result.rows.map((landmark) => ({
      id: landmark.id,
      slug: landmark.slug,
      name: landmark.name,
      type: landmark.type,
      location: landmark.location,
      yearCompleted: landmark.year_completed,
      primaryMaterial: landmark.primary_material,
      span: landmark.span,
      description: landmark.description,
      engineeringLesson: landmark.engineering_lesson,
      image: landmark.image
    }));

    res.json(landmarks);
  } catch (error) {
    console.error('Error fetching landmarks:', error);

    res.status(500).json({
      error: 'Unable to retrieve landmarks'
    });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const result = await pool.query(
      'SELECT * FROM landmarks WHERE slug = $1',
      [slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Landmark not found'
      });
    }

    const landmark = result.rows[0];

    res.json({
      id: landmark.id,
      slug: landmark.slug,
      name: landmark.name,
      type: landmark.type,
      location: landmark.location,
      yearCompleted: landmark.year_completed,
      primaryMaterial: landmark.primary_material,
      span: landmark.span,
      description: landmark.description,
      engineeringLesson: landmark.engineering_lesson,
      image: landmark.image
    });

  } catch (error) {
    console.error('Error fetching landmark:', error);

    res.status(500).json({
      error: 'Unable to retrieve landmark'
    });
  }
});

module.exports = router;