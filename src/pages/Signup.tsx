import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../store/authSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle } from "lucide-react";
import Cookies from "js-cookie";
import { useState } from "react";
import { userPermission } from "@/mockData/user-permission";
import AuthLayout from "@/components/auth/AuthLayout";
import FloatingInput from "@/components/auth/FloatingInput";

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
      welcomePrefix="Welcome to"
      brandHighlight="ABC Trading LLC"
      title="Create Account"
      subtitle="Enter your details to register a new account"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5 pt-1">
        {signupError && (
          <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 rounded-xl border border-red-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{signupError}</span>
          </div>
        )}

        {/* Full Name */}
        <FloatingInput
          id="signup-name"
          label="Full Name"
          required
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />

        {/* Email */}
        <FloatingInput
          id="signup-email"
          label="Email Address"
          type="email"
          required
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        {/* Password */}
        <FloatingInput
          id="signup-password"
          label="Password"
          required
          isPassword
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />

        {/* Confirm Password */}
        <FloatingInput
          id="signup-confirm-password"
          label="Confirm Password"
          required
          isPassword
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        {/* Terms agreement */}
        <div className="px-1 pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setValue("agreeTerms", e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-[#0070ba] focus:ring-[#0070ba] cursor-pointer accent-[#0070ba]"
            />
            <span className="text-xs text-slate-600">
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
          className="w-full bg-[#0070ba] hover:bg-[#005fa0] text-white font-semibold py-3 px-6 rounded-full text-sm sm:text-base tracking-wide shadow-md shadow-[#0070ba]/25 active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Creating Account...</span>
            </>
          ) : (
            "Create Account"
          )}
        </button>

        {/* Login link */}
        <div className="text-center pt-2">
          <p className="text-xs text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#0070ba] font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Signup;
