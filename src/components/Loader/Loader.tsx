import css from "./Loader.module.css";
import { RingLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className={css.wrapper}>
      <RingLoader color="#0d6efd" size={80} speedMultiplier={1.2} />
      <p className={css.text}>Loading movies, please wait...</p>
    </div>
  );
}