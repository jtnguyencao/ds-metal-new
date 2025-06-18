require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB config
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || 'chantier_planning';
const COLLECTION_NAME = process.env.COLLECTION_NAME || 'chantiers';

let db, chantiersCollection;

// Connect to MongoDB
MongoClient.connect(MONGO_URI, { useUnifiedTopology: true })
  .then(client => {
    db = client.db(DB_NAME);
    chantiersCollection = db.collection(COLLECTION_NAME);
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

// API: Get all chantiers
app.get('/api/chantiers', async (req, res) => {
  try {
    const chantiers = await chantiersCollection.find({}).toArray();
    res.json(chantiers.map(chantier => ({
      ...chantier,
      id: chantier._id,
      _id: undefined // Remove _id for frontend compatibility
    })));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch chantiers' });
  }
});

// API: Create a chantier
app.post('/api/chantiers', async (req, res) => {
  const data = req.body;
  if (!data.title || !data.startDate || !data.endDate) {
    return res.status(400).json({ error: 'Missing required fields (title, startDate, endDate)' });
  }
  try {
    const result = await chantiersCollection.insertOne({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create chantier' });
  }
});

// Serve static frontend
const frontendPath = path.join(__dirname, 'frontend');
app.use(express.static(frontendPath));

// Fallback: serve index.html for root
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: frontendPath });
}); 