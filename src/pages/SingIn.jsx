import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { singIn } from "../service/articlesService";
import "./Sing.css";
import { useAuth } from "../context/AuthContext";

export default function SingIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
  register,
  handleSubmit,
  setError,
  formState: { errors },
} = useForm({ mode: "onBlur" });


  const onSubmit = async (data) => {
  try {
    const user = await singIn(
      data.email,
      data.password
    );

    console.log("Пользователь:", user);

     login(user);

    // сохраняем пользователя (токен)
    //localStorage.setItem("user", JSON.stringify(user));
    navigate("/");

  } catch (error) {
  const serverErrors = error.response?.data?.errors;

  if (serverErrors) {
    Object.entries(serverErrors).forEach(([field, messages]) => {
      if (field === "email or password") {
        setError("root", {
            type: "server",
            message: messages.join(", "),
        });
      } else {
        setError(field, {
            type: "server",
            message: messages.join(", "),
        });
      }
    });
}
  }
};

  return (
    <div className="login-page">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
              pattern: {
              value: /^\S+@\S+$/,
              message: "Invalid email address",
            },
          })}
        />
       {errors.email && <p className="error">{errors.email.message}</p>}
       {errors.root && <p className="error">{errors.root.message}</p>}
        {/* Password */}
        <input
          type="password"
          placeholder="Password is required"
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
        {errors.root && <p className="error">{errors.root.message}</p>}
        
    <button type="submit">Login</button>
      </form>

      <p>
        No account? <Link to="/sing-up">Sing Up</Link>
      </p>
    </div>
  );
}