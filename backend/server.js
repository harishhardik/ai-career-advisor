require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// --- In-Memory Database ---
// This replaces MongoDB for demonstration purposes. Data will reset on server restart.
const users = [];
let userIdCounter = 1;

// --- JWT Configuration ---
const JWT_SECRET = process.env.JWT_SECRET || 'a_very_long_random_secret_string_for_demo';

// --- Nodemailer Configuration ---
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS,
    },
});

// --- Helper Functions ---
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30d',
  });
};

// --- Middleware ---
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      
      // Find user in the in-memory array by string ID
      req.user = users.find(u => u._id === decoded.id);
      if (req.user) {
        next();
      } else {
         res.status(401).json({ message: 'Not authorized, user not found' });
      }

    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};


// --- API Routes ---

// @desc    Health check for the API
// @route   GET /
app.get('/', (req, res) => {
  res.send('AI Career Advisor API is running (In-Memory Demo Mode)...');
});


// @desc    Handle contact form submission
// @route   POST /api/contact
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Please fill in all fields.' });
    }
    
    if (!process.env.RECIPIENT_EMAIL || !process.env.GMAIL_USER || !process.env.GMAIL_APP_PASS) {
        console.error('Email credentials not configured in .env file.');
        return res.status(500).json({ message: 'Server error: Email functionality is not configured.' });
    }

    const mailOptions = {
        from: `"${name}" <${process.env.GMAIL_USER}>`,
        to: process.env.RECIPIENT_EMAIL,
        subject: `New message from ${name} via Career Advisor`,
        text: `You have received a new message from:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `<p>You have received a new message from:</p>
               <ul>
                 <li><strong>Name:</strong> ${name}</li>
                 <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
               </ul>
               <p><strong>Message:</strong></p>
               <p>${message.replace(/\n/g, '<br>')}</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ message: 'Failed to send message. Please try again later.' });
        }
        res.status(200).json({ message: 'Message sent successfully!' });
    });
});


// --- User Routes ---

// @desc    Register a new user
// @route   POST /api/users/signup
app.post('/api/users/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }
  
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = {
    _id: (userIdCounter++).toString(),
    name,
    email,
    password: hashedPassword,
    skills: '',
    careerGoals: '',
  };

  users.push(user);

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      skills: user.skills,
      careerGoals: user.careerGoals,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/users/login
app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      skills: user.skills,
      careerGoals: user.careerGoals,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
app.get('/api/users/profile', protect, async (req, res) => {
  // req.user is attached by the 'protect' middleware
  const user = req.user;
  if (user) {
    // Return user data without the password
    const { password, ...userProfile } = user;
    res.json(userProfile);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
app.put('/api/users/profile', protect, async (req, res) => {
  const userIndex = users.findIndex(u => u._id === req.user._id);

  if (userIndex > -1) {
    const user = users[userIndex];
    user.name = req.body.name || user.name;
    // Allow setting skills/goals to an empty string
    user.skills = req.body.skills !== undefined ? req.body.skills : user.skills;
    user.careerGoals = req.body.careerGoals !== undefined ? req.body.careerGoals : user.careerGoals;
    
    users[userIndex] = user;
    
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        skills: user.skills,
        careerGoals: user.careerGoals,
        token: generateToken(user._id), // Issue a new token
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});


const PORT = 5001;
app.listen(PORT, () => console.log(`Server running in demo mode on port ${PORT}`));