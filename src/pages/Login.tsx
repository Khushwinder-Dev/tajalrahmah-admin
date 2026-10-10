import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../store/authSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle } from "lucide-react";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { userPermission } from "@/mockData/user-permission";
import AuthLayout from "@/components/auth/AuthLayout";
import FloatingInput from "@/components/auth/FloatingInput";

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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-1">
        {loginError && (
          <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 rounded-xl border border-red-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{loginError}</span>
          </div>
        )}

        {/* Username or Email with Floating Notched Label */}
        <FloatingInput
          id="login-email"
          label="Username or Email"
          required
          autoComplete="username"
          error={errors.email?.message}
          {...register("email")}
        />

        {/* Password with Floating Notched Label & Eye Toggle */}
        <FloatingInput
          id="login-password"
          label="Password"
          required
          isPassword
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />

        {/* Remember Me & Forgot Password Row */}
        <div className="flex items-center justify-between pt-0.5 px-1">
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
          className="w-full bg-[#0070ba] hover:bg-[#005fa0] text-white font-semibold py-3 px-6 rounded-full text-sm sm:text-base tracking-wide shadow-md shadow-[#0070ba]/25 active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4 cursor-pointer"
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
        {/* <div className="text-center pt-3">
          <p className="text-xs text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#0070ba] font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div> */}
      </form>
    </AuthLayout>
  );
};

export default Login;
