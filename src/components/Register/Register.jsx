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
    <div>
      <h1>Register</h1>
     <form  onSubmit={handleSubmit}>
      <div className="form-group">
  <fieldset>
    
         <label>
          <p>Name</p>
           <input className="form-control" type="text" name="name"  value={formData.name || ""} onChange={handleChange}  /></label>
  </fieldset>
</div>

   <div className="form-group"> <fieldset>  <label><p>Email</p><input className="form-control" type="email" name="email"  value={formData.email || ""} onChange={handleChange}  /></label></fieldset></div>



  <div className="form-group"> <fieldset><label><p>Password</p><input className="form-control" type="password" name="password" value={formData.password || ""} onChange={handleChange} /></label><p>Password</p></fieldset></div>


<div className="form-group">
  <fieldset>      <label><p>Confirm Password</p><input className="form-control" type="password" name="confirmPassword" onChange={handleChange}  value={formData.confirmPassword || ""}  /></label></fieldset>
  
</div>

      <button className="btn btn-primary" type="submit">Register</button>
    </form>
    </div>
  )

}

export default Register;