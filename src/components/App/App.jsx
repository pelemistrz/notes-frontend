import React from "react";
import Register from "../Register/Register";
import Keeper from "../Keeper/Keeper";
import Login from "../Login/Login";


export default function App(){
const token = "";
  if(!token){
    return(<>
          <Login />
      <Register />

    </>
      
    )
  }

  return (
    <Keeper/>
  )
}