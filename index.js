const express = require('express');
const connectToMongoDB = require('./db');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const port = 3000;
const app = express();
app.use(express.json());

connectToMongoDB();


app.use('/api/v1/books', bookRoutes);

app.use('/api/v1/books', reviewRoutes);

app.use('/api/auth/user', userRoutes);

app.listen(port, () => {
	console.log(`The server is listening on port ${port}`);
});