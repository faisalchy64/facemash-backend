require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

// database connection

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.SECRET_KEY}@facemash.ncmow2b.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

app.get("/", (req, res) => {
    res.send("Welcome to facemash server.");
});

async function run() {
    try {
        await client.connect();

        const userCollection = client.db("facemash").collection("users");
        const postCollection = client.db("facemash").collection("posts");
    } finally {
    }
}

run().catch(console.dir);

app.listen(port, () => {
    console.log(`Listening to port ${port}.`);
});
