const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');


const app = express();
const port = process.env.PORT || 4000;

 // Ganti dengan API Key RajaOngkir Anda

app.use(express.json());
app.use(cors());

const storage = multer.memoryStorage(); // Simpan data sebagai buffer di memori
const upload = multer({ storage: storage });


app.get("/", (req, res) => res.send("Berhasil coy"))

app.get("/city", async (req, res) => {
  try {
    const apiKey = process.env.API;
    const response = await axios.get('https://api.rajaongkir.com/starter/city', {
      headers: {
        key: apiKey,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching data from RajaOngkir API');
  }
});
app.get("/cost/:origin/:destination/:weight/:courier", async (req, res) => {
  
    const apiKey = process.env.API;
    const { origin, destination, weight, courier } = req.params;
    const url = `https://api.rajaongkir.com/starter/cost`;


    const config = {
      headers: {
        key: apiKey,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    const data = {
      origin: origin,
      destination: destination,
      weight: weight,
      courier: courier
    }
    try {
      // send POST request to API endpoint
      const response = await axios.post(url, data, config);
     
      // send response back to client
      res.json(response.data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});