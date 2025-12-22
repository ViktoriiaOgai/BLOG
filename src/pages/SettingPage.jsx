import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { updateUser } from "../service/articlesService";
import "./Sing.css";

export default function SettingPage() {
  const { user, login, logout } = useAuth();

  const {
    register,
    handleSubmit,
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
const handleLogout = () => {
    logout();          // сброс user
    navigate("/");     // перенаправление на главную
  };
  const onSubmit = async (data) => {
  try {
    const updatedUser = await updateUser({
      username: data.username,
      email: data.email,
      password: data.password || undefined,
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

        <button className = "save_btn" type="submit">Update Settings</button>
        <button className="logout_btn" onClick={handleLogout}>LogOut</button>
      </form>
      
    </div>
    
  );
}