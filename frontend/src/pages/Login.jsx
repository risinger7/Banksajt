import { useState } from 'react'
import { Link, Navigate } from "react-router-dom"
import '../App.css'

const url = "http://localhost:3000/sessions"

function Login() {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [token, setToken] = useState("")

  function LoginFunc(e){
    e.preventDefault()
    const user = {
      name: name,
      password: password
    }
    const userJSON = JSON.stringify(user)
    console.log("user:", user, "userJSON: ", userJSON)
    console.log("user: ", user.name, user.password, )
    
    // login 
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',   
      },
      body: userJSON,
    })
      .then(res => res.json())
      .then(data => setToken(data.token))   
  }

  return (
    <div className="Reg">
      <div>
        <Link to="/Accounts" state={token}>
          Accounts
        </Link> <br />
        <Link to="/">Home</Link>
      </div>
      
      <h3>token: {token}</h3>
      <h1>Login</h1> 
      <form action="">
        <div>
          <h3>Username: {name}</h3>
          <input type="text" name="name" onChange={(e) => setName(e.target.value)}/>
        </div>
        <div>
          <h3>Password: {password}</h3>
          <input type="text" name="password" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div>
          <button className="marg" onClick={(e) => LoginFunc(e)}>Submit</button>
        </div>   
      </form>
    </div>
  )
}

export default Login;