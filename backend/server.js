const express = require('express')
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors')



dotenv.config();
const app = express()

app.use(express.json());
app.use(cors());
connectDB();

app.use('/api/auth', require('./routes/authRoutes'))
const router = express.Router();
app.use("uploads", express.static("uploads"));
app.use('/api/auth', router);
app.use('/images',express.static('images'))

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`server running in the port ${PORT}`));


