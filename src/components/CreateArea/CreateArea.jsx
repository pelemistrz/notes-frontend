import React,{useEffect, useState} from "react";
import { addNote } from "../../services/notes";
import AddIcon from '@mui/icons-material/Add';


export default function CreateArea(props){
  
  let {alert} = props;

  const [note,setNote] = useState({
    title: "",
    content:""
  });

  function handleChange(event){
    const {name,value} = event.target;
    setNote(prevNote=>{
      return {
        ...prevNote,
        [name]:value
      }
    })
  }

  useEffect(()=>{
    if(alert){
      setTimeout(()=>{
        props.handleAlert(false);
      },1000)
    }
  },[alert])


  function submitNote(event){
    event.preventDefault();
    addNote(note,props.userId);
    setNote({
      title: "",
      content:""
    });
    props.handleAlert(true);
  }

  return(
    <div>
      <form action="" className="create-note">
       {props.alert && <h2>Submit successful</h2>}
          <input type="text" name="title" onChange={handleChange} value={note.title} placeholder="Title"/>
      
        <textarea name="content" onChange={handleChange} value={note.content} placeholder="Take a note..." rows="3" />

        <button type="submit" onClick={submitNote}><AddIcon/></button>
      </form>
    </div>
  )


}