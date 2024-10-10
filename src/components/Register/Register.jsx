import React,{useReducer,useState} from "react";

import axios from 'axios';
import "./Register.css"
import { useThemeProps } from "@mui/material";

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

function Register(props){
  const [formData,setFormData] = useReducer(formReducer,{});
  const [correctConfirm, setCorrectConfirm] = useState(true);

  async function handleSubmit(event){
    event.preventDefault();   
    if(formData.password!==formData.confirmPassword){
      setCorrectConfirm(false);
    }else {
      try{
        const response = await axios.post('https://test.marcinpajak.com.pl/api/register',
          formData
        )    
        if(response){      
         console.log(response);   
         props.setUserId(response.data.userId);
         
        setFormData({
        reset: true
       });
        }
       } catch(e){
        console.error("Errorr during registretion",e);
        alert("An erro roccured")
       }
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
          <p className="my-2">Name</p>
           <input className="form-control" type="text" name="name"  value={formData.name || ""} onChange={handleChange}  /></label>
        </fieldset>
      </div>

   <div className="form-group">
     <fieldset>
      <label><p className="my-2">Email</p>
      <input className="form-control" type="email" name="email"  value={formData.email || ""} onChange={handleChange}  />
      </label>
      </fieldset>
    </div>

  <div className="form-group">
     <fieldset><label>
      <p className="my-2">Password</p>
      <input className="form-control" type="password" name="password" value={formData.password || ""} onChange={handleChange} />
      </label></fieldset>
    </div>


  <div className="form-group">
    <fieldset>
      <label><p className="my-2">Confirm Password</p>
      <input className="form-control" type="password" name="confirmPassword" onChange={handleChange}  value={formData.confirmPassword || ""}  />
      </label>
    </fieldset>  
    </div>
    {
        !correctConfirm && <div className="form-group text-danger"><p className="mt-2 ">Wrong confirmation of password</p></div>
      }

    <div>
        <button className="btn btn-primary mt-3" type="submit">Register</button>
      </div>
    </form>
    </div>
  )

}

export default Register;