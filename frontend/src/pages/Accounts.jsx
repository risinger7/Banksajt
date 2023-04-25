import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"

export default function Accounts() {

  const login = useLocation(); // state from where? -> login. Which state? -> token
  const token = login.state

  const [user, setUser] = useState([{}])
  const [saldo, setSaldo] = useState("")
  const [logged, setLogged] = useState(false)
 
  
  useEffect(() => {  
    fetch("http://localhost:3000/me/accounts", {
      method: "GET",
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        console.log("data: ", data)
        setLogged(true)
        setUser(data[0])
        setSaldo(data[1].saldo)
      }
        )  
      
  }, [])

  return (
    <div>
      <Link to="/">Home</Link>
        {
          logged && 
          <div> 
              <h1>Accounts / logged in</h1>
                <div>
                  <p>name: {user.name}</p>
                  <p>id: {user.id}</p>
                  <p>saldo: {saldo}</p>
              </div>
          </div>
        }
        {
          !logged && 
          <div> Not logged in </div>
        }
    </div>
  )
}