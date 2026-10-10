import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import FloatingInput from "@/components/auth/FloatingInput";

const formSchema = z.object({
  email: z.string().min(1, { message: "Please enter your username or email" }),
});

type ForgotPasswordFormData = z.infer<typeof formSchema>;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [resetError, setResetError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const emailValue = watch("email");

  const onSubmit = async () => {
    setResetError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSuccess(true);
    } catch (error) {
      console.error("Password reset failed:", error);
      setResetError("Unable to process request. Please try again later.");
    }
  };

  return (
    <AuthLayout
      welcomePrefix="Welcome to"
      brandHighlight="ABC Trading LLC"
      title="Reset Password"
      subtitle={
        isSuccess
          ? "Check your inbox for further instructions"
          : "Enter your username or email address to receive recovery instructions"
      }
    >
      {isSuccess ? (
        <div className="space-y-4 text-center py-2">
          <div className="w-12 h-12 bg-[#f0f7fe] text-[#0070ba] rounded-full flex items-center justify-center mx-auto border border-[#d2e7f8]">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <div>
            <h4 className="text-base font-semibold text-slate-800">
              Reset link sent!
            </h4>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              We've dispatched password reset instructions to{" "}
              <strong className="text-slate-700">{emailValue}</strong>.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="w-full bg-[#0070ba] hover:bg-[#005fa0] text-white font-semibold py-3 px-6 rounded-full text-sm tracking-wide shadow-md shadow-[#0070ba]/25 active:scale-[0.99] transition-all cursor-pointer"
            >
              Back to Sign in
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-1">
          {resetError && (
            <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 rounded-xl border border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{resetError}</span>
            </div>
          )}

          {/* Email input with Floating Notched Label */}
          <FloatingInput
            id="forgot-email"
            label="Username or Email"
            required
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0070ba] hover:bg-[#005fa0] text-white font-semibold py-3 px-6 rounded-full text-sm sm:text-base tracking-wide shadow-md shadow-[#0070ba]/25 active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Sending link...</span>
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>

          {/* Back to login */}
          <div className="text-center pt-3">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-[#0070ba] transition-colors font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign in</span>
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  );
};

export default ForgotPassword;
