const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ContactModel = require('./models/contact');
const BranchModel = require('./models/branch');
const EventModel = require('./models/event');
const adminAuthRoutes = require('./routes/adminAuth');
const adminAuth = require('./middleware/auth');
const rootRoutes = require('./routes/root');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));

// MongoDB Connection
mongoose
  .connect('mongodb+srv://lalu:lalu1999@cluster0.n4q8d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err));


  app.use('/roots', rootRoutes);

  app.use('/admin', adminAuthRoutes);

// Protected Admin Route Example
app.get('/admin/dashboard', adminAuth, (req, res) => {
  res.json({ message: 'Welcome to the Admin Dashboard' });
});
// Contact Form Route
app.post('/Contact', async (req, res) => {
  try {
    const contact = await ContactModel.create(req.body);
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: 'Error creating contact' });
  }
});

app.get('/ContactMessages', async (req, res) => {
  try {
    const messages = await ContactModel.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching contact messages' });
  }
});


//delete
app.delete('/ContactMessages/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid message ID' });
  }

  try {
    const deletedMessage = await ContactModel.findByIdAndDelete(id);
    if (!deletedMessage) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.json({ message: 'Message deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting message' });
  }
});


//view 
app.get('/ContactMessages/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid message ID' });
  }

  try {
    const message = await ContactModel.findById(id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching message' });
  }
});

// Create a new branch
app.post('/branches', async (req, res) => {
  try {
    const branch = await BranchModel.create(req.body);
    res.status(201).json(branch);
  } catch (err) {
    console.error('Error adding branch:', err); // Log error for better debugging
    res.status(500).json({ error: 'Failed to add the branch. Please try again later.' });
  }
});

// Update a branch by ID
app.put('/branches/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid branch ID' });
  }

  try {
    const updatedBranch = await BranchModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBranch) {
      return res.status(404).json({ error: 'Branch not found' });
    }
    res.json(updatedBranch);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating branch' });
  }
});
// Get all branches
app.get('/branches', async (req, res) => {
  try {
    const branches = await BranchModel.find();
    res.json(branches);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching branches' });
  }
});
// Get a single branch by ID
app.get('/branches/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid branch ID' });
  }

  try {
    const branch = await BranchModel.findById(id);
    if (!branch) {
      return res.status(404).json({ error: 'Branch not found' });
    }
    res.json(branch);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching branch' });
  }
});

// Delete a branch by ID
app.delete('/branches/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid branch ID' });
  }

  try {
    const deletedBranch = await BranchModel.findByIdAndDelete(id);
    if (!deletedBranch) {
      return res.status(404).json({ error: 'Branch not found' });
    }
    res.json({ message: 'Branch deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting branch' });
  }
});








// Create an event
app.post('/events', async (req, res) => {
  try {
    const event = await EventModel.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    console.error('Error adding event:', err);
    res.status(500).json({ error: 'Failed to add the event. Please try again later.' });
  }
});

// Get all events
app.get('/events', async (req, res) => {
  try {
    const events = await EventModel.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching events' });
  }
});

// Get a single event by ID
app.get('/events/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid event ID' });
  }

  try {
    const event = await EventModel.findById(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching event' });
  }
});

// Update an event by ID
app.put('/events/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid event ID' });
  }

  try {
    const updatedEvent = await EventModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(updatedEvent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating event' });
  }
});

// Delete an event by ID
app.delete('/events/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid event ID' });
  }

  try {
    const deletedEvent = await EventModel.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting event' });
  }
});
// API route to fetch events
app.get('/api/events', async (req, res) => {
  try {
    const events = await EventModel.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch events', error });
  }
});

// Start Server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
