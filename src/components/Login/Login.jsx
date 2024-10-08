import React,{useState} from "react";
import axios from 'axios';

export default function Login(props){
  const [correct, setCorrect] = useState(true);

  const [credentials,setCredentials] = useState({
    email: "",
    password:""
  });
  
  const handleLogin = async (event)=>{
    event.preventDefault();
    try{
      const result = await axios.post('http://localhost:4000/api/login',credentials);
      console.log(result);

      if(result.data.userId){
        props.setUserId(result.data.userId);
      }else{       
       setCorrect(false);
        setCredentials({
          email: "",
          password:""
        });
      }     
    } catch (error){
      console.error("error during login", error);
      setCorrect(false);
    
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
        <p className="my-2">Email</p>
        <input onChange={handleChange} className="form-control" value={credentials.email}  type="email" name="email"/>
        </label>
    </div>
      <div className="form-group">

        <label htmlFor="">
          <p className="my-2">Password</p>
          <input className="form-control" onChange={handleChange} value={credentials.password } type="password" name="password"/>
        </label>
</div>
      {
        !correct && <div className="form-group text-danger"><p className="mt-2 ">Wrong credentials</p></div>
      }
   
        <button className="btn btn-primary mt-3" type="submit">Log In</button>
     
    </form>
</div>
  );
}