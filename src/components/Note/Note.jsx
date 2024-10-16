import React,{useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SaveIcon from '@mui/icons-material/Save';

export default function Note(props){
  const [isEditing,setIsEditing] = useState(false);
  const [editedTitle,setEditedTitle]=useState(props.title);
  const [editedContent,setEditedContent] = useState(props.content);

  function handleClickDelete(){
    props.onDelete(props.id);
  }

  function handleClickEdit(){
    setIsEditing(true);
  }
  function handleSave(){
    props.onEdit(props.id,editedTitle,editedContent)
    setIsEditing(false);
  }

  return(
    
    <div>
      {
      isEditing ?
      (<div className="note">
   
         
            <input className="font-weight-bold form-control mb-2" type="text" clasName="form-control mb-2" value={editedTitle} onChange={e=>setEditedTitle(e.target.value)} />
    
     
      <textarea className="form-control mb-2" value={editedContent} onChange={e=>setEditedContent(e.target.value)}/>  
  
          <button className="btn" onClick={handleSave}><SaveIcon/></button>
   
        </div>
    )
    :
    (<div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button className="btn" onClick={handleClickDelete}><DeleteIcon/></button>
      <button className="btn" onClick={handleClickEdit}><EditNoteIcon/></button>
    </div>)
    }
    </div>
  
  );

}