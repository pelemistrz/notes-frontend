import React,{useReducer} from "react";

import axios from 'axios';
import "./Register.css"

const formReducer = (state,event)=>{
  if(event.reset){
    return {
      email: "",
      password: "",
      confirmPassword:"",
      name:""
    }
  }
  return {
    ...state,
    [event.name]: event.value
  }
}

function Register(){
  const [formData,setFormData] = useReducer(formReducer,{});


  async function handleSubmit(event){
    event.preventDefault();   
   
   try{
    const response = await axios.post('http://localhost:4000/api/register',
      formData
    )

    if(response){
      console.log(response);
      
   setFormData({
    reset: true
   });
    }
   } catch(e){
    console.error("Errorr during registretion",e);
    alert("An erro roccured")
   }

  }

  function handleChange(event){
    setFormData({
      name: event.target.name,
      value: event.target.value
    });    
  }

  return(
    <div className="wrapper">
      <h1>Register</h1>
    <form className="register-wrapper" onSubmit={handleSubmit}>
<fieldset>
  
       <label>
        <p>Name</p>
         <input type="text" name="name"  value={formData.name || ""} onChange={handleChange} placeholder="Name" /></label>
</fieldset>

    <fieldset>  <label><p>Email</p><input type="email" name="email"  value={formData.email || ""} onChange={handleChange} placeholder="Email" /></label></fieldset>



      <fieldset><label><p>Password</p><input type="password" name="password" value={formData.password || ""} onChange={handleChange} placeholder="Password"  /></label><p>Password</p></fieldset>


<fieldset>      <label><p>Confirm Password</p><input type="password" name="confirmPassword" onChange={handleChange}  value={formData.confirmPassword || ""} placeholder="Confirm Password" /></label></fieldset>


      <button type="submit">Register</button>
    </form>
    </div>
  )

}

export default Register;