const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();

// ✅ Allowed origins without trailing slashes
const allowedOrigins = [
  process.env.APP_URL || 'http://localhost:3000',
  'https://soleluxeecommerce.vercel.app'
];

// ✅ CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,PUT,POST,DELETE,OPTIONS',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204
};

// ✅ Apply CORS globally
app.use(cors(corsOptions));

// ✅ Automatically handle OPTIONS preflight
app.options('*', cors(corsOptions));

// ✅ Middlewares
app.use(express.json());
app.use(bodyParser.json());

// ✅ Connect DB
connectDB();

// ✅ Static file routes
app.use("/uploads", express.static("uploads"));
app.use('/images', express.static('images'));

// ✅ Auth routes
app.use('/api/auth', require('./routes/authRoutes'));

// ✅ Start server
app.listen(5000, () => {
  console.log(`Server running on port 5000`);
  console.log(`Allowed Origins: ${allowedOrigins}`);
});
