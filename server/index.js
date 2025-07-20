import express from 'express';
import cors from 'cors';
import connectDB from './connectDB.js'; // Adjust the path as necessary
import auth from './controllers/auth.js'; // Adjust the path as necessary

const app = express();
app.use(cors(
    {
        origin: '*', // Allow all origins
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
    }
));
app.use(express.json());

app.use('/auth', auth); // Use the auth routes


app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(3000, () => {
  console.log('Server is running on port 3000|| http://localhost:3000');
    connectDB(); // Ensure the database connection is established
});