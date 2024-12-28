const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory data store
let items = [
  { id: 1, name: 'Item 1', description: 'This is item 1' },
  { id: 2, name: 'Item 2', description: 'This is item 2' },
];

// Get all items
app.get('/items', (req, res) => {
  res.json(items);
});

// Get a single item by ID
app.get('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const item = items.find(i => i.id === itemId);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Create a new item
app.post('/items', (req, res) => {
  const { name, description } = req.body;
  const newItem = {
    id: items.length + 1, // Simplified ID generation
    name,
    description,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Update an item by ID
app.put('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const { name, description } = req.body;
  const itemIndex = items.findIndex(i => i.id === itemId);

  if (itemIndex !== -1) {
    items[itemIndex] = { id: itemId, name, description };
    res.json(items[itemIndex]);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Delete an item by ID
app.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const itemIndex = items.findIndex(i => i.id === itemId);

  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
    res.status(204).send(); // No content response
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
