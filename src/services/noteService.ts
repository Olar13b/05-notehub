import axios from "axios";
import type { Note, NewNoteData } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api/notes";

const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const noteServiceClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

interface FetchNoteService {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page = 1,
  query = "",
  perPage = 12
): Promise<FetchNoteService> => {
  const params: Record<string, string | number> = { page, perPage };
  if (query) params.search = query;

  const res = await noteServiceClient.get<FetchNoteService>("/", { params });
  return res.data;
};

export const createNote = async (noteData: NewNoteData): Promise<Note> => {
  const res = await noteServiceClient.post<Note>("/", noteData);
  return res.data;
};

export const deleteNote = async (noteId: number): Promise<Note> => {
  const res = await noteServiceClient.delete<Note>(`/${noteId}`);
  return res.data;
};