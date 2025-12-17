import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import "./Sing.css";

export default function Profile() {
  const { user, login, logout } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      password: "",
      avatar: user?.avatar || "",
    },
  });

  const onSubmit = (data) => {
    // имитация запроса на сервер
    // здесь можно вызвать API updateUser
    console.log("Обновленные данные:", data);

    // пример: если сервер вернул ошибку
    // setError("email", { type: "server", message: "Email уже занят" });

    // если всё успешно, обновляем контекст
    login({ ...user, ...data });
    alert("Профиль обновлён!");
  };

  return (
    <div className="prof_change">
      <h2>Редактирование профиля</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label >Enter user name</label>
          <input className="new_input"
             {...register("username", {
              required: "Username is required",
              minLength: {
              value: 3,
              message: "Username must be at least 3 characters",
            },
            maxLength: {
              value: 20,
              message: "Username must be at most 20 characters",
            },
          })}
          />
          {errors.username && <p className="error">{errors.username.message}</p>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input className="new_input"
             {...register("email", {
              required: "Email is required",
              pattern: {
              value: /^\S+@\S+$/,
              message: "Invalid email address",
            },
          })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label>New password</label> 
          <input className="new_input"
            type="password"
           {...register("password", {
              required: "Password is required",
              minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
            maxLength: {
              value: 40,
              message: "Password must be at most 40 characters",
            },
          })}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        <div className="form-group">
          <label>Avatar URL</label>
          <input className="new_input"
            {...register("avatar", {
              pattern: {
                value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i,
                message: "Некорректный URL аватара",
              },
            })}
          />
          {errors.avatar && <p className="error">{errors.avatar.message}</p>}
        </div>

        <button className = "save_btn" type="submit">Save</button>
      </form>
    </div>
  );
}