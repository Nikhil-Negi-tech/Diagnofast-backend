const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Import routes
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Base API route
app.get('/api', (req, res) => {
  res.json({ 
    message: 'DIAGNOFAST API is running!',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      symptoms: '/api/symptoms',
      diagnose: '/api/diagnose',
      admin: '/api/admin/*'
    }
  });
});

// Routes
app.use('/api', userRoutes);
app.use('/api/admin', adminRoutes);

// Base API route for testing
app.get('/api', (req, res) => {
  res.json({ 
    message: 'DIAGNOFAST API is running!',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      symptoms: '/api/symptoms',
      diagnose: '/api/diagnose',
      admin: '/api/admin/*'
    }
  });
});

// Health check routes
app.get('/', (req, res) => {
  res.json({ message: 'DIAGNOFAST API is running!' });
});

// Health check route for uptime monitoring
app.get('/health', (req, res) => {
  const healthCheck = {
    status: 'OK',
    message: 'DIAGNOFAST server is healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  };
  
  // Check MongoDB connection status
  if (mongoose.connection.readyState === 1) {
    healthCheck.database = 'Connected';
  } else {
    healthCheck.database = 'Disconnected';
    healthCheck.status = 'WARNING';
  }
  
  res.status(200).json(healthCheck);
});

// Comprehensive health check with API status
app.get('/api/health', (req, res) => {
  const healthStatus = {
    status: 'OK',
    service: 'DIAGNOFAST API',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB'
    },
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
    endpoints: {
      symptoms: '/api/symptoms',
      diagnose: '/api/diagnose',
      admin: '/api/admin/*'
    }
  };
  
  // Check database connection
  if (mongoose.connection.readyState === 1) {
    healthStatus.database = {
      status: 'Connected',
      name: mongoose.connection.name || 'diagnofast'
    };
  } else {
    healthStatus.database = {
      status: 'Disconnected'
    };
    healthStatus.status = 'ERROR';
  }
  
  // Set appropriate HTTP status
  const httpStatus = healthStatus.status === 'OK' ? 200 : 503;
  res.status(httpStatus).json(healthStatus);
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  
  // Start server
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌐 API URL: http://localhost:${PORT}`);
  });
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;
