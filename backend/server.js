require('dotenv').config(); 
const express = require('express');
const app = express();
const configRoutes = require('./routes/routes'); 
const authRoutes = require('./routes/authRoutes');
const cors = require('cors'); 

app.use(cors());

app.use(express.json()); 

app.use('/api/config', configRoutes);

app.use("/api", authRoutes)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
