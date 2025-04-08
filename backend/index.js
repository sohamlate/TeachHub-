const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const studyMaterialRoutes = require('./routes/studyMaterialRoutes');
const contactRoute = require('./routes/contactRoutes');
const awardRoutes = require('./routes/awardRoutes');
const quizRoutes = require('./routes/quizRoutes');
const deliveredSessionRoutes = require("./routes/deliveredSessions");


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
app.use('/api/profiles', require('./routes/profileRoutes'));
app.use('/api/awards', awardRoutes);
app.use('/api/study-materials', studyMaterialRoutes);
app.use("/api/sessions", deliveredSessionRoutes);
app.use('/api/quiz', quizRoutes);


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
