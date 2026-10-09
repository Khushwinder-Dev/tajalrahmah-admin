import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../store/authSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { userPermission } from "@/mockData/user-permission";
import AuthLayout from "@/components/auth/AuthLayout";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" }),
  rememberMe: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "dsuae@rapiderp.com",
      password: "",
      rememberMe: false,
    },
  });

  // Load remembered credentials on component mount
  useEffect(() => {
    const rememberedCredentials = localStorage.getItem("rememberedCredentials");
    if (rememberedCredentials) {
      try {
        const { email, password } = JSON.parse(rememberedCredentials);
        setValue("email", email);
        setValue("password", password);
        setRememberMe(true);
      } catch (error) {
        console.error("Error reading remembered credentials:", error);
        localStorage.removeItem("rememberedCredentials");
      }
    }
  }, [setValue]);

  const onSubmit = async (data: FormData) => {
    setLoginError("");

    try {
      if (rememberMe) {
        localStorage.setItem(
          "rememberedCredentials",
          JSON.stringify({
            email: data.email,
            password: data.password,
          })
        );
      } else {
        localStorage.removeItem("rememberedCredentials");
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Set cookie token
      Cookies.set("auth_token", "sample-jwt-token-123", {
        expires: 7,
        secure: true,
      });

      // Dispatch Redux login state
      dispatch(
        login({
          userId: data.email,
          email: data.email,
          name: data.email.split("@")[0],
          userRole: "admin",
          permissions: userPermission,
        })
      );

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("An error occurred during login. Please try again.");
    }
  };

  return (
    <AuthLayout
      badge="WELCOME BACK"
      title="Sign in to start your session"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {loginError && (
          <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 dark:bg-red-950/40 dark:text-red-300 rounded-xl border border-red-200 dark:border-red-900/50">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{loginError}</span>
          </div>
        )}

        {/* Email Input */}
        <div>
          <div className="relative flex items-center bg-[#f1f3f7] dark:bg-slate-800/80 rounded-xl px-3.5 py-2.5 transition-all border border-slate-200/50 dark:border-slate-700/50 focus-within:border-[#01a9a0] focus-within:ring-2 focus-within:ring-[#01a9a0]/20 focus-within:bg-white dark:focus-within:bg-slate-800">
            <Mail className="w-4 h-4 text-slate-400 shrink-0 mr-2.5" />
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-transparent border-0 outline-none text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 font-normal"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-500 mt-1 pl-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div>
          <div className="relative flex items-center bg-[#f1f3f7] dark:bg-slate-800/80 rounded-xl px-3.5 py-2.5 transition-all border border-slate-200/50 dark:border-slate-700/50 focus-within:border-[#01a9a0] focus-within:ring-2 focus-within:ring-[#01a9a0]/20 focus-within:bg-white dark:focus-within:bg-slate-800">
            <Lock className="w-4 h-4 text-slate-400 shrink-0 mr-2.5" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full bg-transparent border-0 outline-none text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 font-normal"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500 mt-1 pl-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between pt-0.5">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => {
                setRememberMe(e.target.checked);
                setValue("rememberMe", e.target.checked);
              }}
              className="w-4 h-4 rounded border-gray-300 text-[#01a9a0] focus:ring-[#01a9a0] cursor-pointer accent-[#01a9a0]"
            />
            <span className="text-xs text-slate-600 dark:text-slate-300">
              Remember Me
            </span>
          </label>

          <Link
            to="/forgot-password"
            className="text-xs font-medium text-[#01a9a0] hover:text-[#008f87] transition-colors"
          >
            Forgot Password
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#01a9a0] hover:bg-[#008f87] text-white font-bold py-2.5 sm:py-3 px-6 rounded-full text-xs sm:text-sm tracking-wider uppercase shadow-md shadow-[#01a9a0]/25 active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>LOGGING IN...</span>
            </>
          ) : (
            "LOG IN"
          )}
        </button>

        {/* Sign up link */}
        <div className="text-center pt-2">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#01a9a0] font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
