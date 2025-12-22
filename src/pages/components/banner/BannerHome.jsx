import "./Banner.css";
import ulogo from "../../../assets/ulogo.svg";

export default function Banner({ variant = "default", title, subtitle }) {
  return (
    <div className={`banner banner--${variant}`}>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
         </div>
  );
}