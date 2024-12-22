import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 5174;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for timetables
let timetables = [];

// POST: Create a new timetable
app.post('/api/timetables', (req, res) => {
  const newTimetable = req.body;
  timetables.push(newTimetable);
  res.status(201).json({ message: 'Timetable created successfully', id: timetables.length - 1 });
});

// GET: Retrieve all timetables
app.get('/api/timetables', (req, res) => {
  res.json(timetables);
});

// GET: Retrieve a timetable by ID
app.get('/api/timetables/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (id >= 0 && id < timetables.length) {
    res.json(timetables[id]);
  } else {
    res.status(404).json({ message: 'Timetable not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
