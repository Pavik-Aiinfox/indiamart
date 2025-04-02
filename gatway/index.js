const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Proxy Requests to User Microservice
app.post('/api/signin', async (req, res) => {
    try {
        const response = await axios.post(`http://localhost:9000/api/signIn`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: "Error forwarding request to User Service",
            error: error.response?.data || "Unknown error"
        });
    }
});

app.post('/api/otp', async (req, res) => {
    try {
        const response = await axios.post(`http://localhost:8000/api/sendotp`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: "Error forwarding request to User Service",
            error: error.response?.data || "Unknown error"
        });
    }
});
app.post('/api/verify', async (req, res) => {
    try {
        const response = await axios.post(`http://localhost:8000/api/verifyotp`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: "Error forwarding request to User Service",
            error: error.response?.data || "Unknown error"
        });
    }
});

app.post('/api/saveData', async (req, res) => {
    try {
        const response = await axios.post(`http://localhost:8000/api/save`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: "Error forwarding request to User Service",
            error: error.response?.data || "Unknown error"
        });
    }
});

// Start API Gateway
app.listen(PORT, () => {
    console.log(`🚀 API Gateway running on http://localhost:${PORT}`);
});