import React, { useState } from 'react'
import './Login.scss'
import newRequest from '../../utils/newRequest'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
      const res = await newRequest.post('/auth/login', {username, password})
      localStorage.setItem('currentUser', JSON.stringify(res.data));
      navigate('/')
    } catch (err) {
      setError(err.response.data)
    }
  }

  return (
    <div className="login">
      <div className="container">
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="">Username</label>
          <input
            type="text"
            name=""
            id=""
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="">Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Login</button>
          { error && error }
        </form>
      </div>
    </div>
  );
}

export default Login