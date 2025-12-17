import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { singUp } from "../service/articlesService";
import "./Sing.css";
export default function SingUp() {
  const navigate = useNavigate();
  const {
  register,
  handleSubmit,
  watch,
  setError,
  formState: { errors },
} = useForm({ mode: "onBlur" });


  const onSubmit = async (data) => {
  try {
    const user = await singUp(
      data.username,
      data.email,
      data.password
    );

    console.log("Пользователь зарегистрирован:", user);

    // сохраняем пользователя (токен)
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/");

  } catch (error) {
  const serverErrors = error.response?.data?.errors;

  if (serverErrors) {
    Object.entries(serverErrors).forEach(([field, messages]) => {
      setError(field, {
        type: "server",
        message: messages.join(", "),
      });
    });
  }
}
};

  return (
    <div className="auth-page">
      <h1>Create new account</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Username */}
        <input
          type="text"
          placeholder="Username"
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

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
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

        {/* Repeat Password */}
        <input
          type="password"
          placeholder="Repeat password"
          {...register("repeatPassword", {
              required: "Password is required",
              validate: (value) =>
              value === watch("password") || "Passwords must match",
          })}
        />
        {errors.repeatPassword && <p className="error">{errors.repeatPassword.message}</p>}

        {/* Agreement */}
        <label>
          <input
            type="checkbox"
            {...register("agree", {
              required: "You must agree to the processing of personal data",
            })}
          />
          I agree to the processing of my personal information
        </label>
        {errors.agree && <p className="error">{errors.agree.message}</p>}

        <button type="submit">Create</button>
      </form>

      <p>
        Already have an account? <Link to="/sing-in">Sing In</Link>
      </p>
    </div>
  );
}