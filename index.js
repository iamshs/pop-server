const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = 5000 || process.env.PORT;


app.use(cors());
app.use(express());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  `mongodb+srv://${process.env.PS_USER}:${process.env.PS_PASS}@cluster0.f2xkrlu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run () {
try{
    await client.connect()
    const movieCollection = client.db('popCritic').collection('movies')

    app.get("/movies" , async(req,res) =>{
        const movies = await movieCollection.find({}).toArray()
        res.send(movies)
    })

    app.get("/movie/:id" , async(req,res) =>{
      const id = req.params.id
      const filter = { _id : new ObjectId(id)}
      const movie = await movieCollection.findOne(filter)
      res.send(movie)
    })
}
finally{
    

}
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
