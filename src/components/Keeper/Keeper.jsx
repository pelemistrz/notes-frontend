import React, {useState, useEffect} from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import CreateArea from "../CreateArea/CreateArea";
import Note from "../Note/Note";
import {getNotes,deleteNoteFromDb,editNoteInDb} from "../../services/notes";


function Keeper(props) {
  const [notes,setNotes] = useState([]);
  const [alert,setAlert] = useState(false);
  let mounted = true;

  function handleAlert(data){
    setAlert(data);
  }
  function handleLogout(){
    props.handleLogout();
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

  function handleEditNote(noteId,newTitle,newContent){
     setNotes(prevNotes=>{
      return prevNotes.map((note)=>{
      if(note.id===noteId){
        return {...note,title:newTitle,content:newContent};
      }
      return note;
    })
    });
    editNoteInDb(noteId,newTitle,newContent);
  }

  return (
    <div>
    <Header
    handleLogout={handleLogout} />
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
          onEdit={handleEditNote}
        />
      );
    })}

    <Footer /> 
    </div>
  );
}

export default Keeper;
