import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../store/authSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { userPermission } from "@/mockData/user-permission";
import AuthLayout from "@/components/auth/AuthLayout";

const formSchema = z.object({
  email: z.string().min(1, { message: "Please enter your username or email" }),
  password: z.string().min(1, { message: "Password is required" }),
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
      welcomePrefix="Welcome to"
      brandHighlight="ABC Trading LLC"
      title="Sign in"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {loginError && (
          <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 rounded-xl border border-red-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{loginError}</span>
          </div>
        )}

        {/* Username or Email Input */}
        <div>
          <label className="block text-xs sm:text-[13px] font-medium text-slate-700 mb-1.5">
            Enter your username or email address
          </label>
          <div className="relative flex items-center bg-white rounded-xl border border-slate-200 focus-within:border-[#0070ba] focus-within:ring-2 focus-within:ring-[#0070ba]/20 transition-all">
            <input
              type="text"
              placeholder="Username or email address"
              className="w-full bg-transparent border-0 outline-none px-3.5 py-2.5 sm:py-3 text-sm text-slate-800 placeholder:text-slate-400 font-normal rounded-xl"
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
          <label className="block text-xs sm:text-[13px] font-medium text-slate-700 mb-1.5">
            Enter your Password
          </label>
          <div className="relative flex items-center bg-white rounded-xl border border-slate-200 focus-within:border-[#0070ba] focus-within:ring-2 focus-within:ring-[#0070ba]/20 transition-all">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full bg-transparent border-0 outline-none px-3.5 py-2.5 sm:py-3 pr-10 text-sm text-slate-800 placeholder:text-slate-400 font-normal rounded-xl"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-slate-400 hover:text-slate-600 transition-colors p-1"
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

        {/* Remember Me & Forgot Password Row */}
        <div className="flex items-center justify-between pt-0.5">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => {
                setRememberMe(e.target.checked);
                setValue("rememberMe", e.target.checked);
              }}
              className="w-4 h-4 rounded border-gray-300 text-[#0070ba] focus:ring-[#0070ba] cursor-pointer accent-[#0070ba]"
            />
            <span className="text-xs text-slate-600">Remember Me</span>
          </label>

          <Link
            to="/forgot-password"
            className="text-xs font-medium text-[#0070ba] hover:text-[#005088] hover:underline transition-colors"
          >
            Forgot Password
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#0070ba] hover:bg-[#005fa0] text-white font-semibold py-3 px-6 rounded-xl sm:rounded-2xl text-sm sm:text-base tracking-wide shadow-md shadow-[#0070ba]/25 active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            "Sign in"
          )}
        </button>

        {/* Sign up link */}
        <div className="text-center pt-3">
          <p className="text-xs text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#0070ba] font-semibold hover:underline"
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
