const express = require('express');
const axios = require('axios');
const router = express.Router();

// Botpress config - replace with your Botpress server URL and Bot ID
const BOTPRESS_URL = process.env.BOTPRESS_URL || 'http://localhost:3001/api/v1/bots/my-bot-id/mod/converse';
const BOTPRESS_AUTH_TOKEN = process.env.BOTPRESS_AUTH_TOKEN || ''; // add your Botpress auth token if required

router.post('/', async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ reply: 'Invalid message format' });
  }

  try {
    const botpressResponse = await axios.post(
      BOTPRESS_URL,
      {
        type: 'text',
        text: message,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          ...(BOTPRESS_AUTH_TOKEN && { Authorization: `Bearer ${BOTPRESS_AUTH_TOKEN}` }),
        },
        timeout: 5000 // optional: timeout in ms
      }
    );

    // Botpress can return multiple messages in responses array, join them
    const replies = botpressResponse.data.responses || [];
    const replyText = replies.map(r => r.text).filter(Boolean).join('\n') || 'Sorry, no response from the bot.';

    res.json({ reply: replyText });

  } catch (error) {
    console.error('Error communicating with Botpress:', error.message, error.response?.data);
    res.status(500).json({ reply: 'Error communicating with chatbot service.' });
  }
});

module.exports = router;

