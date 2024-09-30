
// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const path = require('path');

// // Initialize Express app
// const app = express();
// const port = 3000;

// // Serve static files (HTML, CSS)
// app.use(express.static(path.join(__dirname, 'public')));

// // Middleware to parse form data
// app.use(bodyParser.urlencoded({ extended: true }));

// // Session management
// app.use(session({
//   secret: 'secret',
//   resave: false,
//   saveUninitialized: true,
// }));

// // MongoDB connection
// mongoose.connect('mongodb://localhost:27017/userAuth', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch((err) => {
//   console.error('Error connecting to MongoDB:', err);
// });

// // User Schema for MongoDB
// const UserSchema = new mongoose.Schema({
//   username: String,
//   email: String,  // Add email field
//   password: String,
// });

// const User = mongoose.model('User', UserSchema);

// // Routes
// app.get('/', (req, res) => {
//   res.redirect('/login');
// });

// // Signup route
// app.post('/signup', async (req, res) => {
//   const { username, email, password } = req.body;

//   const userExists = await User.findOne({ email });
//   if (userExists) {
//     return res.send('User already exists');
//   }

//   // Hash the password before storing it
//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = new User({ username, email, password: hashedPassword });
//   await newUser.save();

//   res.redirect('/login');
// });

// // Login route
// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   const user = await User.findOne({ username });
//   if (!user) {
//     return res.send('User not found');
//   }

//   // Compare hashed password
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (isMatch) {
//     req.session.user = user;
//     res.send(`Login successful! Welcome, ${user.username}`);
//   } else {
//     res.send('Incorrect password');
//   }
// });

// // Logout route
// app.get('/logout', (req, res) => {
//   req.session.destroy();
//   res.redirect('/login');
// });

// // Start server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

// Initialize Express app
const app = express();
const port = 3000;

// Serve static files (HTML, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Session management
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/userAuth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// User Schema for MongoDB
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,  // Add email field
  password: String,
});

const User = mongoose.model('User', UserSchema);

// Routes
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Signup route
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.send('User already exists');
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Log success message to console
    console.log(`New user created: ${newUser.username} (${newUser.email})`);

    res.redirect('/login');
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.send('User not found');
  }

  // Compare hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    req.session.user = user;
    res.send(`Login successful! Welcome, ${user.username}`);
  } else {
    res.send('Incorrect password');
  }
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
