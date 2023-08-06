const express = require('express');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://jaiswalpratyush10:%4020VDDQGZRGNv@cluster0.hsyunze.mongodb.net/iplfantasyleague', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Create a schema for players
const playerSchema = new mongoose.Schema({
  name: String,
  team: String,
  points: Number
});

// Create a model for players
const Player = mongoose.model('Player', playerSchema, 'Player');

// Create the Express application
const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/players', async (req, res) => {
  try {
    const players = await Player.find();
    // res.render("")
    res.json(players);
  } catch (error) {
    console.error('Error retrieving players:', error);
    res.status(500).json({ error: 'Failed to retrieve players' });
  }
});

/* app.post('/players', async (req, res) => {
  const { name, team, points } = req.body;

  if (!name || !team || !points) {
    return res.status(400).json({ error: 'Name, team, and points are required' });
  }

  try {
    const player = new Player({ name, team, points });
    await player.save();
    res.status(201).json(player);
  } catch (error) {
    console.error('Error creating player:', error);
    res.status(500).json({ error: 'Failed to create player' });
  }
}); */

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
