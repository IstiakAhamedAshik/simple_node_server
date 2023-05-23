const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb')
var cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

//Uname:database1
//password :xelxCxP6NhpEolxZ
/* const users = [
  { id: 1, name: 'Istiak Ahamed Ashik', email: 'istiak234@gmail.com' },
  { id: 2, name: 'Mozahid hassan murad', email: 'murad567@gmail.com' },
  { id: 3, name: 'Sb siam', email: 'sb789@gmail.com' },
] */

const uri =
  'mongodb+srv://database1:xelxCxP6NhpEolxZ@cluster0.fhpnqfy.mongodb.net/?retryWrites=true&w=majority'

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function run() {
  try {
    const userCollection = client.db('simpleNode').collection('user')
    //const user = { name: 'Ashik', email: 'ashik123@gmail.com' }
    // const result = await userCollection.insertOne(user)
    // console.log(result)
    app.get('/users', async (req, res) => {
      const cursor = userCollection.find({})
      const users = await cursor.toArray()
      res.send(users)
    })

    app.post('/users', async (req, res) => {
      console.log('api post called')
      const user = req.body
      console.log(user)
      const result = await userCollection.insertOne(user)
      user._id = result.insertedId
      res.send(user)
    })
  } finally {
    //await client.close()
  }
}
run().catch((err) => console.log(err))

app.get('/', (req, res) => {
  res.send('Simple Node Server Running')
})
app.get('/users', (req, res) => {
  res.send(users)
})
/* app.post('/users', (req, res) => {
  console.log('api post called')

  const user = req.body
  console.log(user)
  user.id = users.length + 1
  users.push(user)
  res.send(user)
}) */
app.listen(port, () => {
  console.log(`Simple node server running on port ${port}`)
})
