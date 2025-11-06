const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();

// ✅ CORS FIX (Allow your Netlify site + localhost for testing)
app.use(cors({
  origin: [
    "https://idyllic-shortbread-6a080d.netlify.app",  // your live frontend
    "http://localhost:5500",                          // local testing (VS Code Live Server)
    "http://localhost:3000"                           // optional (React/Node local)
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(bodyParser.json());

// ✅ Backend status route (good)
app.get("/", (req, res) => {
  res.json({ status: "Backend running", base: "/api" });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

// Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => 
  console.log(`🚀 Server running on port ${PORT}`)
);


