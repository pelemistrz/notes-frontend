import React from "react";
import Register from "../Register/Register";
import Keeper from "../Keeper/Keeper";
import Login from "../Login/Login";
import useUserId from "../../services/useUserId";



export default function App(){
  const {userId,setUserId} = useUserId();
  function handleLogout(){
    setUserId(null);
    localStorage.clear();

  }

  if(!userId){
    return(<div className="container">

      <div className="row mt-5">
        <div className="col-6 d-flex justify-content-end px-5">   <Login setUserId={setUserId}
         /></div>
       <div className="col-6 d-flex justify-content-start px-5"> <Register setUserId={setUserId}  /></div>
      </div>

    </div>
      
    )
  }

  return (
    <Keeper userId={userId}
      handleLogout={handleLogout}/>
  )
}