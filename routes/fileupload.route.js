const express = require('express');
const router = express.Router();
const upload = require('../utils/file.upload');

router.post('/upload', upload.array('images', 5), (req,res) => {
  try {
    const filePaths = req.files.map(file => file.path);
    res.status(201).json({
      message: 'Images uploaded successfully!',
      files: filePaths,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.patch(
  '/updateProfile',
  authController.protect,
  authController.updateProfile
)


module.exports = router;