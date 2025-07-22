import axios from "axios";
import type { Note, NoteTag } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

interface FetchNotesResponse {
  notes: Note[];
  page: number;
  perPage: number;
  totalPages: number;
}
export interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

interface FetchNotesParams {
  query?: string;
  page?: number;
  perPage?: number;
}

export const fetchNotes = async ({
  query = "",
  page = 1,
  perPage = 12,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const token = import.meta.env.VITE_NOTEHUB_TOKEN;
  const params: Record<string, string | number> = {
    page,
    perPage,
  };
  if (query.trim()) {
    params.search = query.trim();
  }
  const config = {
    params,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get<FetchNotesResponse>("/notes", config);
  return res.data;
};

export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
  const token = import.meta.env.VITE_NOTEHUB_TOKEN;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post<Note>("/notes", noteData, config);
  return res.data;
};

export const deleteNote = async (noteId: number): Promise<Note> => {
  const token = import.meta.env.VITE_NOTEHUB_TOKEN;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.delete<Note>(`/notes/${noteId}`, config);
  return res.data;
};