const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

// CORS - allow all origins
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

const IFLOW_API_KEY = process.env.IFLOW_API_KEY;
const IFLOW_BASE_URL = 'https://apis.iflow.cn/v1';

// Model mapping - all models use deepseek-v3.2
const MODELS = {
  'gpt-3.5-turbo': 'deepseek-v3.2',
  'gpt-4': 'deepseek-v3.2',
  'gpt-4-turbo': 'deepseek-v3.2',
  'gpt-4o': 'deepseek-v3.2',
  'claude-3-opus': 'deepseek-v3.2',
  'claude-3-sonnet': 'deepseek-v3.2',
  'gemini-pro': 'deepseek-v3.2',
  'deepseek-v3.2': 'deepseek-v3.2'
};

// Root end
