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

app.post('/api/seller/signUp', async (req, res) => {
    try {
        const response = await axios.post(`http://localhost:7000/api/seller/signup`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: "Error forwarding request to User Service",
            error: error.response?.data || "Unknown error"
        });
    }
});

app.post('/api/seller/logIn', async (req, res) => {
    try {
        const response = await axios.post(`http://localhost:7000/api/seller/login`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: "Error forwarding request to User Service",
            error: error.response?.data || "Unknown error"
        });
    }
});

app.post('/api/seller/prod', async (req, res) => {
    try {
        const response = await axios.post(`http://localhost:7000/api/seller/products`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: "Error forwarding request to User Service",
            error: error.response?.data || "Unknown error"
        });
    }
});

app.post('/api/category/added', async (req, res) => {
    try {
        const response = await axios.post(`http://localhost:6000/api/category/add`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: "Error forwarding request to User Service",
            error: error.response?.data || "Unknown error"
        });
    }
});

app.get('/api/category/getting', async (req, res) => {
    try {
        const response = await axios.get(`http://localhost:6000/api/category/get`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: "Error forwarding request to User Service",
            error: error.response?.data || "Unknown error"
        });
    }
});

app.get('/api/category/get/:id', async (req, res) => {
    try {
        const {id} = req.params
        const response = await axios.get(`http://localhost:6000/api/category/get/${id}`, req.body);
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