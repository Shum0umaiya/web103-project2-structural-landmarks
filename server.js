const express = require('express');
const path = require('path');
const landmarksRouter = require('./server/routes/landmarks');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, 'public')));

// PostgreSQL API routes
app.use('/api/structures', landmarksRouter);

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Detail page
app.get('/structures/:slug', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'details.html'));
});

// Catch-all 404 page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Structural Landmarks is running at http://localhost:${PORT}`);
});