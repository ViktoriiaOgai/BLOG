import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { updateUser } from "../service/articlesService";
import "./Sign.css";
import { useNavigate } from "react-router-dom";

export default function SettingPage() {
  const { user, login, logout } = useAuth();
const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      text: "",
      avatar: user?.avatar || "",
    },
  });
const handleLogout = () => {
    logout();          // сброс user
    navigate("/");     // перенаправление на главную
  };
  const onSubmit = async (data) => {
  try {
    const updatedUser = await updateUser({
      username: data.username,
      email: data.email,
      text: data.text || undefined,
      image: data.avatar,
    });

    login(updatedUser); // обновляем AuthContext
    alert("Профиль обновлён!");
  } catch (error) {
    console.error(error);

    if (error.response?.data?.errors) {
      Object.entries(error.response.data.errors).forEach(
        ([field, messages]) => {
          setError(field, {
            type: "server",
            message: messages.join(", "),
          });
        }
      );
    }
  }
};

  return (
    
    <div className="prof_change">
      <h2>Your Settings</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            className="new_input"
            {...register("username", { required: "Username is required" })}
            placeholder="Username"
          />
          {errors.username && <p className="error">{errors.username.message}</p>}
        </div>

        <div className="form-group">
          <input
            className="new_input"
            {...register("email", { required: "Email is required" })}
            placeholder="Email"
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <textarea
            className="new_input"
            placeholder="Введите свой комментарий"
            {...register("text")}
          />
        </div>

        <div className="form-group">
          <input
            className="new_input"
            {...register("avatar", {
              pattern: {
                value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i,
                message: "Некорректный URL аватара",
              },
            })}
            placeholder="Avatar URL"
          />
          {errors.avatar && <p className="error">{errors.avatar.message}</p>}
        </div>

        <div className="buttons-row">
  <button className="logout_btn" type="button" onClick={handleLogout}>
    <span className="out">Click here to log out</span>
  </button>
  <button className="save_btn" type="submit">
    <span className="update">Update Settings</span>
  </button>
</div>
      </form>
    </div>
  );
}