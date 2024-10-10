import axios from "axios";

export async function getNotes(userId) {
  try {
    const response = await axios.get(
      `https://test.marcinpajak.com.pl/api/notes/${userId}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function addNote(note, userId) {
  try {
    const result = await axios.post(
      `https://test.marcinpajak.com.pl/api/notes/${userId}`,
      note
    );
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteNoteFromDb(noteId) {
  try {
    const result = await axios.delete(
      `https://test.marcinpajak.com.pl/api/notes/${noteId}`
    );
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

export async function editNoteInDb(noteId, newTitle, newContent) {
  try {
    const result = await axios.put(
      `https://test.marcinpajak.com.pl/api/notes/${noteId}`,
      {
        newTitle: newTitle,
        newContent: newContent,
      }
    );
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
