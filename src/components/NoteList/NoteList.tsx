import { useState } from "react";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../services/noteService";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface NoteListProps {
  notes: Note[];
}
export default function NoteList({ notes }: NoteListProps) {
  const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { mutate: handleDelete } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: () => setError("Failed to fetch notes. Please try again."),
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              className={css.button}
              onClick={() => handleDelete(String(note.id))}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
      {error && <ErrorMessage message={error} />}
      {notes.length === 0 && <p className={css.empty}>No notes found.</p>}
    </ul>
  );
}