import cors from "cors"
import express from "express";
import jwt from "jsonwebtoken"

const app = express();
const PORT = 3000;
const SECRET = "abcabcabc123123123jag"

// middleware
app.use(express.json())
app.use(
  cors()
)

const users = [
  { 
    name: "Viktor",
    password: "123",
    id: 1,
  },
  { 
    name: "Jim",
    password: "321",
    id: 2,
  },
]

const accounts = [
  {
    id: 1,
    saldo: 1000
  },
  {
    id: 2,
    saldo: 2000
  },
]

let userId = 3;

// GET
app.get("/", (req, res) => {
  console.log(" GET /")
  res.json(users)
})

//POST
app.post("/users", (req, res) => {
  console.log("POST /users")

  // create new user and account w saldo of req.body
  const newUser = { name: req.body.name, password: req.body.password}
  const newAccount = {id: userId, saldo: req.body.saldo}
  newUser.id = userId++
  users.push(newUser)
  accounts.push(newAccount)
  console.log("users: ", users, "newUser: ", newUser, "saldo:", newAccount.saldo )

  res.send()
})

// POST login
app.post("/sessions", (req, res) => {
  console.log("POST /sessions")

  const user = req.body 
  const dbUser = users.find(u => u.name == user.name)
  if(dbUser == null || dbUser == undefined) {
    console.log("undefined")
    res.status(403).send()
  }
  
  // if password match, create token
  if(dbUser.password == user.password){
    console.log("dbUser.password == user.password, success!")
    
    // create token
    const token = jwt.sign(dbUser.id, SECRET)
    console.log("token: ", token, "id: ", dbUser.id)
    res.json({token})
  } else {
    console.log("password fail")
    res.status(403).send()
  }
})

// GET my acount
app.get("/me/accounts", (req, res) => {
  console.log("GET /me/accounts")

  const headers = req.headers
  const authHeader = headers["authorization"]
  const token = authHeader.split(" ")[1]

  jwt.verify(token, SECRET, (err, userId) =>{
    console.log("TOKEN : ", token)
    if(err){
      res.sendStatus(403)
    } else {
        const dataToSend = []
        const user = users.find(u => u.id == userId)
        const  userAccount = accounts.find(u => u.id == userId)
        const saldo = userAccount.saldo

        // res.cookie(user.name + " cookie", token, { maxAge: 90000000, httpOnly: false})
        dataToSend.push(user, {saldo: saldo})
        res.send(dataToSend)
      }
  })
})

app.listen(PORT, () => {
  console.log("server started, port: ", PORT)
})