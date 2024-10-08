import React from "react";
import LogoutIcon from '@mui/icons-material/Logout';

export default function Header(props){
  


  return(
    <header >
      <h1>Keeper <button className="btn float-end" onClick={props.handleLogout}>Logout <LogoutIcon/> </button></h1>
    </header>
  )
}