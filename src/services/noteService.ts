import axios from "axios";
import type { Note } from "../types/note";
import type {NewNote} from "../types/newNotes"


interface NoteHttpResponse {
  notes: Note[];
  totalPages: number;
}

interface fetchNotesProps {
  page: number;
  search?:string
}



const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;


export async function fetchNotes({page, search}:fetchNotesProps): Promise<NoteHttpResponse> {
  const url = `https://notehub-public.goit.study/api/notes`;
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${myKey}`,
    },
    params: {
      search,
      page,
      perPage: 12,
      ...(search ? { search } : {}),
    }
  };

  const response = await axios.get<NoteHttpResponse>(url, options);
  return response.data;
}


export async function postNote(values: NewNote): Promise<Note> {
  const url = `https://notehub-public.goit.study/api/notes`;
  const options = {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${myKey}`,
    }
  };

    const response = await axios.post<Note>(url,values, options)
    return response.data;
}


export async function deleteNote(noteId: number){
  const url = `https://notehub-public.goit.study/api/notes/${noteId}`;
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${myKey}`,
    }
  };

    const response = await axios.delete<Note>(url, options)
    return response.data;
}