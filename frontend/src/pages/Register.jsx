import { useState } from 'react'
import { Link, Navigate } from "react-router-dom"
import '../App.css'

const url = "http://localhost:3000/users"

export default function Register() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [saldo, setSaldo] = useState("")
  const [nav, setNav] = useState(false)

  function submitFunc(e){
    e.preventDefault()
    const user = {
      name: username,
      password: password, 
      saldo: saldo
    }
    const userJSON = JSON.stringify(user)
    console.log("user:", user, "userJSON: ", userJSON)
    console.log("user: ", user.name, user.password)
    
    // POST
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
      },
      body: userJSON,
    })
      .then(response => {
        console.log(response, "response here")
        if(response.ok) {
          setNav(true);
        }
      })
  }

  return (
    <div className="Reg">
      {nav ? <Navigate to="/login"></Navigate> : null}

      <Link to="/">Home</Link>
      <h1>Register user</h1>
      <form action="">
        <div>
          <h3>Username: {username}</h3>
          <input type="text" name="username" onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div>
          <h3>Password: {password}</h3>
          <input type="text" name="password" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div>
          <h3>Saldo: {saldo}</h3>
          <input type="text" name="saldo1" onChange={(e) => setSaldo(e.target.value)}/>
        </div>
        <div>
          <button className="marg" onClick={(e) => submitFunc(e)}>Submit</button>
        </div>
        
      </form>
    </div>
  )
}

