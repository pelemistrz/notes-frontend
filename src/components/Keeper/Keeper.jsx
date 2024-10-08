import React, {useState, useEffect, useRef} from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import CreateArea from "../CreateArea/CreateArea";
import Note from "../Note/Note";
import {getNotes,deleteNoteFromDb} from "../../services/notes";

function Keeper(props) {
  const [notes,setNotes] = useState([]);
  const [alert,setAlert] = useState(false);
  let mounted = true;

  function handleAlert(data){
    setAlert(data);
  }

  async function fetchNotes(userId){
    try{
      const response = await getNotes(userId);
      setNotes(response);
    } catch (error){
      console.log(error);
    }  
  }

  useEffect(()=>{
  
      if(notes.length && !alert){
        return;
      }
      if(mounted){
        fetchNotes(props.userId);
      }
      return ()=>{
        mounted = false;
      }
  },[alert,notes]);

  function deleteNote(noteId){
    deleteNoteFromDb(noteId);

    setNotes(prevNotes=>{
      return prevNotes.filter((n)=>{
        return n.id !== noteId;
      })
    })
  }
  return (
    <div>
    <Header />
    <CreateArea 
        userId={props.userId}
        handleAlert={handleAlert}
        alert={alert}
    />

    {notes.map((noteItem,index)=>{
      return(
        <Note
          key={index}
          id={noteItem.id}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
        />
      );
    })}

    <Footer /> 
    </div>
  );
}

export default Keeper;
