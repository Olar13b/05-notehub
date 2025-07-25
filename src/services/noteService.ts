import axios from "axios";
import type { Note } from "../types/note";

const API_BASE_URL = "https://notehub-public.goit.study/api";
const NOTES_ENDPOINT = "/notes";

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  },
});

interface FetchNotesParams {
  page?: number;
  search?: string;
  perPage?: number;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = "",
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page, perPage };

  if (search) {
    params.search = search;
  }

  const response = await axiosInstance.get<FetchNotesResponse>(NOTES_ENDPOINT, {
    params: params,
  });
  return response.data;
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: Note["tag"];
}): Promise<Note> => {
  const response = await axiosInstance.post<Note>(NOTES_ENDPOINT, note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await axiosInstance.delete<Note>(`${NOTES_ENDPOINT}/${id}`);
  return response.data;
};