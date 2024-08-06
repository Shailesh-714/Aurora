const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
const port = 3000; // or any other port you prefer
const url = 'https://artistic-sunbird-actively.ngrok-free.app/api/chat';

app.use(bodyParser.json());
app.use(cors());

app.post('/message', async (req, res) => {
  const { model, messages } = req.body;

  try {
    const response = await axios.post(url, {
      model: model,
      messages: messages,
      stream: false,
    });

    if (response.status === 200) {
      res.json(response.data);
    } else {
      res.status(response.status).send(response.statusText);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
