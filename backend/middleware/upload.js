const multer = require('multer');
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images'); // Directory to save the uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Filename format: timestamp.extension
  }
});

// Set up multer upload
const upload = multer({ storage: storage });

// Export the middleware
const uploadMiddleware = upload.single('image');

module.exports = uploadMiddleware;