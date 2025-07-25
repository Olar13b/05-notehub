import { useState } from "react";
import { Formik, Form, Field, ErrorMessage as FormikError } from "formik";
import { object, string, mixed } from "yup";
import css from "./NoteForm.module.css";
import type { NoteTag } from "../../types/note";
import type { Note } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../services/noteService";
import { AxiosError } from "axios";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface NoteFormProps {
  onCancel: () => void;
}

export interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

const initialValues: NoteFormValues = {
  title: "",
  content: "",
  tag: "Todo",
};

const validationSchema = object({
  title: string().min(3).max(50).required("Title is required"),
  content: string().max(500),
  tag: mixed<NoteTag>()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required(),
});

export default function NoteForm({ onCancel }: NoteFormProps) {
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<
    Note,
    AxiosError<Error>,
    NoteFormValues
  >({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onCancel();
    },
    onError: () => setError("Failed to create note. Please try again."),
  });

  const handleSubmit = (values: NoteFormValues) => {
    mutate(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid }) => (
        <Form className={css.form}>
          {error && <ErrorMessage message={error} />}

          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field name="title" id="title" type="text" className={css.input} />
            <FormikError name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              as="textarea"
              name="content"
              id="content"
              rows={8}
              className={css.textarea}
            />
            <FormikError
              name="content"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" name="tag" id="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <FormikError name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              onClick={onCancel}
              className={css.cancelButton}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid || isSubmitting || isPending}
            >
              {isPending ? "Creating..." : "Create note"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}