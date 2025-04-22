const express = require('express')
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors')
const bodyParser = require('body-parser');


dotenv.config();
const app = express()

const allowedOrigins = [process.env.APP_URL || 'http://localhost:3000', 'https://soleluxeecommerce.vercel.app/'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,PUT,POST,DELETE,OPTIONS',
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization']
};
// Apply CORS middleware first
app.use(cors(corsOptions));

// Preflight handling for all routes
app.options('*', (req, res) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(204);
  } else {
    res.sendStatus(403); // Forbidden
  }
});

app.use(express.json());
app.use(bodyParser.json());
connectDB();

// Handle CORS for all requests
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }
    next();
  });

app.use('/api/auth', require('./routes/authRoutes'))
const router = express.Router();
app.use("uploads", express.static("uploads"));
app.use('/api/auth', router);
app.use('/images',express.static('images'))

app.listen(5000, () => {
    console.log(`Server running on port 5000`);
    console.log(`Allowed Origins: ${allowedOrigins}`);
  });


