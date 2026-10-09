import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
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
      badge="PASSWORD RECOVERY"
      title="Reset your password"
      subtitle={
        isSuccess
          ? "Check your inbox for further instructions"
          : "Enter your email to receive recovery instructions"
      }
    >
      {isSuccess ? (
        <div className="space-y-4 text-center py-2">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-950/50 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-800 dark:text-white">
              Reset link sent!
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
              We've dispatched password reset instructions to{" "}
              <strong className="text-slate-700 dark:text-slate-300">
                {emailValue}
              </strong>
              .
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="w-full bg-[#2ba0ee] hover:bg-[#1f93df] text-white font-bold py-2.5 sm:py-3 px-6 rounded-full text-xs sm:text-sm tracking-wider uppercase shadow-md shadow-[#2ba0ee]/25 active:scale-[0.99] transition-all"
            >
              BACK TO LOGIN
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {resetError && (
            <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 dark:bg-red-950/40 dark:text-red-300 rounded-xl border border-red-200 dark:border-red-900/50">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{resetError}</span>
            </div>
          )}

          {/* Email input */}
          <div>
            <div className="relative flex items-center bg-[#f1f3f7] dark:bg-slate-800/80 rounded-xl px-3.5 py-2.5 transition-all border border-slate-200/50 dark:border-slate-700/50 focus-within:border-[#2ba0ee] focus-within:ring-2 focus-within:ring-[#2ba0ee]/20 focus-within:bg-white dark:focus-within:bg-slate-800">
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

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#2ba0ee] hover:bg-[#1f93df] text-white font-bold py-2.5 sm:py-3 px-6 rounded-full text-xs sm:text-sm tracking-wider uppercase shadow-md shadow-[#2ba0ee]/25 active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>SENDING LINK...</span>
              </>
            ) : (
              "SEND RESET LINK"
            )}
          </button>

          {/* Back to login */}
          <div className="text-center pt-2">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#2ba0ee] dark:text-slate-400 dark:hover:text-[#2ba0ee] transition-colors font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  );
};

export default ForgotPassword;
