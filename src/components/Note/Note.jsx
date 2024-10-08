import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

export default function Note(props){
  function handleClick(){
    props.onDelete(props.id);
  }
  return(
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button className="btn" onClick={handleClick}><DeleteIcon/></button>
    </div>
  )

}