const express = require("express");
const app = express();
const cors = require("cors");

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

// Use the MONGO_URI environment variable
const uri = process.env.MONGO_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    const db = client.db("mernJobPortal");
    const jobCollection = db.collection("demoJobs");

    //post a job
    app.post("/add-job", async (req, res) => {
      const body = req.body;
      body.createAt = new Date();
      // console.log(body)
      const result = await jobCollection.insertOne(body);
      if (result.insertedId) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send({
          message: "can not insert please try again ",
          status: false,
        });
      }
    });
    //get all job
    app.get("/all-jobs", async (req, res) => {
      const job = await jobCollection.find().toArray();
      res.send(job);
    });

    // get single job by using id 
    app.get("/all-jobs/:id", async (req, res) => {
      const id = req.params.id;
      const job = await jobCollection.findOne( {_id: new ObjectId(id)});
      res.send(job);
    })

    //get jobs by email
    app.get("/myJobs/:email", async (req, res) => {
      const job = await jobCollection
        .find({ postedBy: req.params.email })
        .toArray();
      res.send(job);
    });

    // delete job by id
    app.delete("/job/:id", async (req, res) => {
      const id = req.params.id;
      try {
        const filter = { _id: new ObjectId(id) }; // Ensures id is treated as an ObjectId
        const result = await jobCollection.deleteOne(filter);
    
        if (result.deletedCount === 1) {
          res.status(200).json({ acknowledged: true, message: "Job deleted successfully" });
        } else {
          res.status(404).json({ acknowledged: false, message: "Job not found" });
        }
      } catch (error) {
        console.error("Error deleting job:", error);
        res.status(500).json({ acknowledged: false, message: "Error deleting job" });
      }
    });

    // update job
    app.patch("/update-job/:id", async (req, res) => {
      const id = req.params.id;
      const jobData= req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          ...jobData,
        },
      }
      const result = await jobCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    })
    

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    // Do not close the client here if you want to use it in your routes
    // await client.close();
  }
}

run().catch(console.dir);

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start the server
app.listen(8000, () => {
  console.log("Server has started on port 8000");
});
