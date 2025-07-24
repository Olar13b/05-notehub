import css from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message: string;
}
export default function ErrorMessage({
  message = "Try it once",
}: ErrorMessageProps) {
  return <p className={css.text}>{message}</p>;
}