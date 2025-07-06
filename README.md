# DIAGNOFAST - Symptom Diagnosis System

A comprehensive full-stack web application for symptom-based disease diagnosis with medicine recommendations. Built with React, Node.js, Express, and MongoDB.

## 🎯 Features

### 👤 User Features
- **Interactive Symptom Selection**: Modern, responsive UI for selecting multiple symptoms
- **Smart Disease Matching**: Rule-based algorithm that matches symptoms to diseases
- **Medicine Recommendations**: Detailed medicine information with dosage and type
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Results**: Instant diagnosis based on selected symptoms

### 🔐 Admin Features
- **Secure Authentication**: JWT-based login system
- **Disease Management**: Add, edit, and delete diseases with symptoms
- **Medicine Management**: Manage medicine recommendations for each disease
- **Dashboard Analytics**: View system statistics and metrics
- **Real-time Updates**: Changes reflect immediately in the user interface

## 🛠️ Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React.js, Tailwind CSS, Framer Motion |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (with Mongoose ODM) |
| **Authentication** | JWT (JSON Web Tokens) |
| **UI/UX** | Heroicons, Custom Animations |

## 📁 Project Structure

```
DIAGNOFAST/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── Admin/     # Admin-specific components
│   │   │   ├── Diagnosis/ # Diagnosis components
│   │   │   ├── Layout/    # Layout components
│   │   │   └── UI/        # UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── context/       # React context
│   │   └── index.css      # Global styles
├── server/                # Node.js backend
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Express middleware
│   ├── .env              # Environment variables
│   └── server.js         # Main server file
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB installation
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd DIAGNOFAST
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   MONGODB_URI=your_mongodb_url
   JWT_SECRET=your-super-secret-jwt-key-here
   PORT=5000
   NODE_ENV=development
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend server on `http://localhost:5000`
   - Frontend development server on `http://localhost:3000`

### MongoDB Setup

1. Create a MongoDB Atlas account at [mongodb.com](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address
5. Get the connection string and update the `MONGODB_URI` in your `.env` file

## 🔧 Configuration

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-secret-key` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |

### Admin Setup

1. Navigate to `http://localhost:3000/admin/login`
2. Click "First time? Setup admin account"
3. Fill in the admin credentials
4. The system will create the first admin account

## 📊 Database Schema

### Diseases Collection
```javascript
{
  "name": "Malaria",
  "symptoms": ["fever", "chills", "nausea", "headache"],
  "description": "A disease caused by a plasmodium parasite, transmitted by mosquitoes.",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Medicines Collection
```javascript
{
  "disease": "Malaria",
  "medicines": [
    {
      "name": "Chloroquine",
      "type": "Tablet",
      "dosage": "500mg"
    },
    {
      "name": "Primaquine",
      "type": "Tablet",
      "dosage": "15mg"
    }
  ],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Admins Collection
```javascript
{
  "username": "admin",
  "passwordHash": "$2a$10$hashed_password_here",
  "email": "admin@diagnofast.com",
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## 🔌 API Endpoints

### User Endpoints
- `GET /api/symptoms` - Get all available symptoms
- `POST /api/diagnose` - Get diagnosis based on symptoms
- `GET /api/disease/:id` - Get disease details

### Admin Endpoints (JWT Protected)
- `POST /api/admin/login` - Admin login
- `POST /api/admin/setup` - Initial admin setup
- `GET /api/admin/diseases` - Get all diseases
- `POST /api/admin/disease` - Add new disease
- `PUT /api/admin/disease/:id` - Update disease
- `DELETE /api/admin/disease/:id` - Delete disease
- `GET /api/admin/medicines/:diseaseName` - Get medicines for disease
- `POST /api/admin/medicines` - Update medicines
- `GET /api/admin/stats` - Get dashboard statistics

## 🎨 UI Features

- **Glass Morphism Design**: Modern frosted glass effect
- **Smooth Animations**: Framer Motion animations throughout
- **Responsive Layout**: Mobile-first design approach
- **Interactive Elements**: Hover effects and transitions
- **Loading States**: Elegant loading spinners and states
- **Error Handling**: User-friendly error messages

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for secure password storage
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured CORS for cross-origin requests
- **Environment Variables**: Sensitive data stored in environment variables

## 🚀 Deployment

### Production Build

1. **Build the client**
   ```bash
   cd client
   npm run build
   ```

2. **Set production environment variables**
   ```env
   NODE_ENV=production
   MONGODB_URI=your-production-mongodb-uri
   JWT_SECRET=your-production-jwt-secret
   ```

3. **Start the production server**
   ```bash
   cd server
   npm start
   ```

### Deployment Platforms

- **Frontend**: Vercel, Netlify, or AWS S3
- **Backend**: Heroku, Railway, or AWS EC2
- **Database**: MongoDB Atlas (recommended)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Medical Disclaimer

This application is for educational and informational purposes only. It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified healthcare providers with any questions regarding medical conditions.

## 📞 Support

For support, email support@diagnofast.com or create an issue in the repository.

## 🙏 Acknowledgments

- Icons provided by [Heroicons](https://heroicons.com/)
- UI animations by [Framer Motion](https://www.framer.com/motion/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Database hosting by [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
