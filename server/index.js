const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// MongoDB Connection with Mongoose
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // Timeout after 10 seconds
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// User Schema
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// Job Schema (for demoJobs collection)


const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  minPrice: {
    type: String, // assuming salary is stored as a numeric value
    required: true,
  },
  maxPrice: {
    type: String, // assuming salary is stored as a numeric value
    required: true,
  },
  salaryType: {
    type: String,
    
    required: true,
  },
  jobLocation: {
    type: String,
    required: true,
  },
  postingDate: {
    type: String,
    required: true,
    get: (date) => date.slice(0, 10), // Ensures the date is in 'YYYY-MM-DD' format
  },
  experienceLevel: {
    type: String,
    
    required: true,
  },
  skills: {
    type: [String], // array of strings for multiple skills
    required: true,
  },
  companyLogo: {
    type: String, // URL for the logo
  },
  employmentType: {
    type: String,
     // restrict to valid options
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  postedBy: {
    type: String, // email of the poster
    required: true,
  },
})

const Job = mongoose.model("Job", jobSchema);

const authenticateToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token." });
    req.user = user;
    next();
  });
};

// Signup Route
app.post("/auth/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ fullName, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error registering user.", error });
  }
});
app.get("/protected", authenticateToken, (req, res) => {
  res
    .status(200)
    .json({ message: "You have access to protected data.", user: req.user });
});
// Login Route
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ message: "Login successful." });
  } catch (error) {
    res.status(500).json({ message: "Error logging in.", error });
  }
});

app.put("/update-job/:id", authenticateToken, async (req, res) => {
  const { id } = req.params; // Job ID from URL parameters
  const {
    jobTitle,
    companyName,
    minPrice,
    maxPrice,
    salaryType,
    jobLocation,
    postingDate,
    experienceLevel,
    skills,
    companyLogo,
    employmentType,
    jobDescription,
    postedBy,
  } = req.body
  
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      {
        jobTitle,
        companyName,
        minPrice,
        maxPrice,
        salaryType,
        jobLocation,
        postingDate,
        experienceLevel,
        skills,
        companyLogo,
        employmentType,
        jobDescription,
        postedBy,
      },
      { new: true } // Ensures the updated document is returned
    );


    // If no job found, send a 404 error
    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Send a success response with the updated job details
    res.status(200).json({
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({
      message: "Error updating job",
      error: error.message,
    });
  }
});

app.post("/job", authenticateToken, async (req, res) => {
  try {
    const {
      jobTitle,
    companyName,
    minPrice,
    maxPrice,
    salaryType,
    jobLocation,
    postingDate,
    experienceLevel,
    skills,
    companyLogo,
    employmentType,
    jobDescription,
    postedBy,
  } = req.body;

  const {email} = req.user

    
    // Create a new job entry
    const newJob = new Job({
      jobTitle,
      companyName,
      minPrice,
      maxPrice,
      salaryType,
      jobLocation,
      postingDate,
      experienceLevel,
      skills,
      companyLogo,
      employmentType,
      jobDescription,
      postedBy: email,
    });

    // Save the job to the database
    const data = await newJob.save();
    
    res.status(201).json({ message: "Job created successfully", job: newJob });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating job", error: error.message });
  }
});

// Delete Job
app.delete("/job/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the job by ID
    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully", job: deletedJob });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job", error: error.message });
  }
});



// Logout Route
app.get("/auth/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully." });
});

// Route to interact with the demoJobs collection
app.post("/jobs", authenticateToken, async (req, res) => {
  const { title, description, location, salary } = req.body;

  if (!title || !description || !location || !salary) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newJob = new Job({ title, description, location, salary });
    await newJob.save();
    res.status(201).json({ message: "Job posted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error posting job.", error });
  }
});
app.get("/user-job", authenticateToken, async (req, res) => {
  try {
    const { email } = req.user;
    
    const jobs = await Job.find({ postedBy: email });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs.", error });
  }
});
// Route to get all jobs
app.get("/all-jobs", async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs.", error });
  }
});
app.get("/all-jobs/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const jobs = await Job.findById(id);
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs.", error });
  }
});
// Start the Server
app.listen(8000, () => {
  console.log("Server started on port 8000");
});
