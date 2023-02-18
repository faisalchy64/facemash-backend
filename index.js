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

        // get single user from database
        app.get("/users/:email", async (req, res) => {
            const { email } = req.params;
            const query = { email };

            const result = await userCollection.findOne(query);

            res.send(result);
        });

        // post single user to database
        app.post("/users", async (req, res) => {
            const user = req.body;

            const result = await userCollection.insertOne(user);

            res.send(result);
        });

        // put single user to database
        app.put("/users/:id", async (req, res) => {
            const { id } = req.params;
            const filter = { _id: new ObjectId(id) };

            const result = await userCollection.updateOne(filter, {
                $set: req.body,
            });

            res.send(result);
        });

        // get posts from database
        app.get("/posts", async (req, res) => {
            const query = {};

            const cursor = postCollection.find(query);
            const result = await cursor.toArray();

            res.send(result);
        });

        // get single post from database
        app.get("/posts/:id", async (req, res) => {
            const { id } = req.params;
            const query = { _id: new ObjectId(id) };

            const result = await postCollection.findOne(query);

            res.send(result);
        });

        // post single post to database
        app.post("/posts", async (req, res) => {
            const post = req.body;

            const result = await postCollection.insertOne(post);

            res.send(result);
        });

        // put single post to database
        app.put("/posts/:id", async (req, res) => {
            const { id } = req.params;
            const filter = { _id: new ObjectId(id) };

            const result = await postCollection.updateOne(filter, {
                $set: req.body,
            });

            res.send(result);
        });
    } finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.listen(port, () => {
    console.log(`Listening to port ${port}.`);
});
