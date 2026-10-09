import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../store/authSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import Cookies from "js-cookie";
import { useState } from "react";
import { userPermission } from "@/mockData/user-permission";
import AuthLayout from "@/components/auth/AuthLayout";

const signupSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(1, { message: "Please confirm password" }),
    agreeTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signupError, setSignupError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: true,
    },
  });

  const agreeTerms = watch("agreeTerms");

  const onSubmit = async (data: SignupFormData) => {
    setSignupError("");

    try {
      // Simulate account registration
      await new Promise((resolve) => setTimeout(resolve, 600));

      Cookies.set("auth_token", "sample-jwt-token-123", {
        expires: 7,
        secure: true,
      });

      dispatch(
        login({
          userId: data.email,
          email: data.email,
          name: data.name,
          userRole: "admin",
          permissions: userPermission,
        })
      );

      navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error);
      setSignupError("Registration failed. Please try again.");
    }
  };

  return (
    <AuthLayout
      badge="GET STARTED"
      title="Create your account"
      subtitle="Enter your details to register a new account"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
        {signupError && (
          <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 dark:bg-red-950/40 dark:text-red-300 rounded-xl border border-red-200 dark:border-red-900/50">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{signupError}</span>
          </div>
        )}

        {/* Full Name */}
        <div>
          <div className="relative flex items-center bg-[#f1f3f7] dark:bg-slate-800/80 rounded-xl px-3.5 py-2.5 transition-all border border-slate-200/50 dark:border-slate-700/50 focus-within:border-[#2ba0ee] focus-within:ring-2 focus-within:ring-[#2ba0ee]/20 focus-within:bg-white dark:focus-within:bg-slate-800">
            <User className="w-4 h-4 text-slate-400 shrink-0 mr-2.5" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full bg-transparent border-0 outline-none text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 font-normal"
              {...register("name")}
            />
          </div>
          {errors.name && (
            <p className="text-xs text-red-500 mt-1 pl-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
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
            <p className="text-xs text-red-500 mt-1 pl-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
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

        {/* Confirm Password */}
        <div>
          <div className="relative flex items-center bg-[#f1f3f7] dark:bg-slate-800/80 rounded-xl px-3.5 py-2.5 transition-all border border-slate-200/50 dark:border-slate-700/50 focus-within:border-[#01a9a0] focus-within:ring-2 focus-within:ring-[#01a9a0]/20 focus-within:bg-white dark:focus-within:bg-slate-800">
            <Lock className="w-4 h-4 text-slate-400 shrink-0 mr-2.5" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full bg-transparent border-0 outline-none text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 font-normal"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-500 mt-1 pl-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Terms agreement */}
        <div>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setValue("agreeTerms", e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-[#01a9a0] focus:ring-[#01a9a0] cursor-pointer accent-[#01a9a0]"
            />
            <span className="text-xs text-slate-600 dark:text-slate-300">
              I agree to the Terms of Service & Privacy Policy
            </span>
          </label>
          {errors.agreeTerms && (
            <p className="text-xs text-red-500 mt-1 pl-1">
              {errors.agreeTerms.message}
            </p>
          )}
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
              <span>CREATING ACCOUNT...</span>
            </>
          ) : (
            "CREATE ACCOUNT"
          )}
        </button>

        {/* Login link */}
        <div className="text-center pt-2">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#01a9a0] font-semibold hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Signup;
