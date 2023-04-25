import { Link } from "react-router-dom"

export default function Home() {

  return (
    <div>  
      <h1>Banksajt</h1>
      
        <div>
          <Link to="/register">Register</Link> <br />
          <Link to="/login">Login</Link> <br />
          <Link to="/accounts">Account</Link>
        </div>    
    </div>
  )
}