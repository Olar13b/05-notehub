import axios from 'axios';
import type { Note } from '../types/note';

interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

interface NewNote {
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}

const URL = 'https://notehub-public.goit.study/api/notes';

export const fetchNotes = async (
  query: string,
  page: number
): Promise<NotesHttpResponse> => {
  const parameters = new URLSearchParams({
    ...(query !== '' ? { search: query } : {}),
    page: page.toString(),
  });
  const response = await axios.get<NotesHttpResponse>(`${URL}?${parameters}`, {
    headers: {
      Authorization: import.meta.env.VITE_TMDB_TOKEN, 
    },
  });
  return response.data;
};

export const createNote = async (newNote: NewNote): Promise<Note> => {
  const response = await axios.post<Note>(`${URL}`, newNote, {
    headers: {
      Authorization: import.meta.env.VITE_TMDB_TOKEN,
    },
  });
  return response.data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const response = await axios.delete<Note>(`${URL}/${id}`, {
    headers: {
      Authorization: import.meta.env.VITE_TMDB_TOKEN,
    },
  });
  return response.data;
};