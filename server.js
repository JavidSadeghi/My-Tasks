const express = require('express');
const connectDB = require('./config/db');

const app = express();

// let day = new Date();
// console.log('Date is: ' + day.getDay());

// Connect Database
connectDB();

// Initial Middlware
app.use(express.json({ extended: false }));

// app.get('/', (req, res) => res.json({ msg: 'Hello' }));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

