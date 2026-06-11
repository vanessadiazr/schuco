require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());


app.get('/api/countries', async (req, res) => {
  try {

    const response = await fetch(
      'https://api.restcountries.com/countries/v5?response_fields=names,capitals,population,area,currencies',
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`
        }
      }
    );

    const text = await response.text();

    if (!response.ok) {
      return res.status(response.status).json({ error: text });
    }
    
    const data = JSON.parse(text);

    const mappedData = (data.data.objects || []).map(country => ({
      name: {
        official: country.names?.official || 'N/A'
      },
      capital: country.capitals
        ? country.capitals.map(cap => cap.name)
        : [],
      population: country.population || 0,
      area: country.area?.kilometers || 0,
      currencies: country.currencies || []
    }));

    res.json(mappedData);
  
  } catch (error) {
    console.error('ERROR:', error);
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
