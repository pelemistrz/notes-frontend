import React,{useState} from "react";
import axios from 'axios';

export default function Login(){

  const [credentials,setCredentials] = useState({
    email: "",
    password:""
  });
  
  const handleLogin = async (event)=>{
    event.preventDefault();

    try{
      const response = await axios.post('http://localhost:4000/api/login',credentials);
      
      console.log(response);
    } catch (error){
      console.error("error during login", error);
      alert("an error ocurred");
    }
    setCredentials({
      email: "",
      password:""
    });
  }

  function handleChange(event){
    const {name,value} = event.target;
    setCredentials(prevValue=>{
      if(name==="email"){
        return {
          email: value,
          password: prevValue.password
        }
      } else if(name==="password"){
        return {
          email: prevValue.email,
          password: value
        }
      }
    })
  }
  
  return(
    
<div>
  <h1>Login</h1>
  <form  onSubmit={handleLogin}>
      <div className="form-group">
        <label >
        <p>Email</p>
        <input onChange={handleChange} className="form-control" value={credentials.email}  type="email" name="email"/>
        </label>
    </div>
      <div className="form-group">

        <label htmlFor="">
          <p>Password</p>
          <input className="form-control" onChange={handleChange} value={credentials.password } type="password" name="password"/>
        </label>
</div>
   
        <button className="btn btn-primary" type="submit">Log In</button>
     
    </form>
</div>
  );
}