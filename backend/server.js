import express from 'express';
import mongoose from 'mongoose';
import tour from './routes/tours.js';
import tourAnalytics from './routes/analytics.js';
import tourSettings from './routes/tourSettings.js';
import auth from './routes/auth.js';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Required in ES modules to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', auth);
app.use('/api/tour', tour);
app.use('/api/tourAnalytics', tourAnalytics);
app.use('/api/tourSettings', tourSettings);


// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'api')));

// Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     success: false,
//     message: 'Something went wrong!',
//     error: process.env.NODE_ENV === 'development' ? err.message : undefined
//   });
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
