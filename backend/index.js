const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const contactRoute = require('./routes/contactRoutes');

dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB

const db = process.env.MONGO_URI
console.log("Start working line ",db);
mongoose.connect(db)
.then(()=>{console.log("db connected successfuly")})
.catch((err)=>{
    console.error(err);
    process.exit(1);
});    

app.use('/api/contact', contactRoute);  
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/experience', require('./routes/experienceRoutes'));
app.use('/api/education', require('./routes/educationRoutes'));
app.use('/api/publication', require('./routes/publicationRoutes'));



// Routes
app.get("/", (req, res) => {
    return res.json({
      success: true,
      message: "Your server is up and running ..",
    });
  });

  

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
