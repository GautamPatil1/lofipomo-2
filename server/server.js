const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
const uri = "mongodb+srv://gautampatil:MGsxw0XPIc2qFGaK@gautam.5nbd8ho.mongodb.net/?retryWrites=true&w=majority";

app.use(cors());
app.use(express.json());

const client = new MongoClient(uri);
client.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

// App Routes

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

app.get('/api/todos/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const todos = await client
      .db('todos')
      .collection('todos')
      .find({ userId })
      .toArray();

    res.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.put('/api/todos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { task, completed } = req.body;

    await client
      .db('todos')
      .collection('todos')
      .updateOne({ id }, { $set: { completed, task } });

    res.json({ message: 'Todo updated successfully' });
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/todos', async (req, res) => {
  try {
    const todo = req.body;
    const userId = todo.userId;
    
    // Ensure userId is included in the request body
    if (!userId) {
      return res.status(400).json({ error: 'userId is required in the request body' });
    }

    // Remove userId from the todo object (if it was included)
    delete todo.userId;

    // Associate the todo with the user by adding userId to the todo document
    todo.userId = userId;

    const result = await client
      .db('todos')
      .collection('todos')
      .insertOne(todo);

    res.status(201).json({ ...todo, _id: result.insertedId }); // Return the inserted todo with its generated _id
  } catch (error) {
    console.error('Error adding todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.delete('/api/todos/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const result = await client
      .db('todos')
      .collection('todos')
      .deleteOne({ id });

    if (result.deletedCount === 0) {
      console.log(`No todo found with id: ${id}`);
      return res.status(404).json({ error: `No todo found with id: ${id}` });
    }

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/notes/:userid', async (req, res) => {
  const userid = req.params.userid;
  const notes = await client.db('notes').collection('notes').find({ userId: userid }).toArray();
  res.json(notes);
});

//Route to get notes for a user
app.get('/api/notes/:userid', async (req, res) => {
  const userId = req.params.userid;
  const notes = await client.db('notes').collection('notes').find({ userId }).toArray();
  res.json(notes);
});


// Route to update notes for a user
app.put('/api/notes/:userid', async (req, res) => {
  const userId = req.params.userid;
  const updatedNotes = req.body;

  try {
    const result = await client.db('notes').collection('notes').updateOne({ userId }, { $set: updatedNotes }, { upsert: true });
    res.json({ message: 'Notes updated!' });
  } catch (error) {
    console.error('Error updating notes:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(5000, () => { console.log('Server Started on port 5000'); });
