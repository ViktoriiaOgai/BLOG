import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../service/articlesService";
import "./Sign.css";
import { useAuth } from "../context/AuthContext";

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
  register,
  handleSubmit,
  setError,
  clearErrors,
  formState: { errors },
} = useForm({ mode: "onBlur" });


  const onSubmit = async (data) => {
  try {
    const user = await signIn(
      data.email,
      data.password
    );
     login(user);
     navigate("/");

  } catch (error) {
  setError("root", {
    type: "server",
    message: "Email or password is invalid",
  });

  if (serverErrors) {
    Object.entries(serverErrors).forEach(([field, messages]) => {
      if (field === "email or password") {
        setError("root", {
          type: "server",
          message: "Email or password is invalid",
        });
      } else {
        setError(field, {
          type: "server",
          message: messages.join(", "),
        });
      }
    });
  }else {
    setError("root", {
      type: "server",
      message: "Server is unavailable. Please try again later.",
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
    onChange: () => clearErrors("root"),
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
    onChange: () => clearErrors("root"),
  })}
/>
        {errors.password && <p className="error">{errors.password.message}</p>}
        {errors.root && <p className="error">{errors.root.message}</p>}
       
           <button type="submit">Sign In</button>
      </form>

      <p>
        No account? <Link to="/sign-up">Sign Up</Link>
      </p>
    </div>
  );
}