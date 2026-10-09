import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../store/authSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, AlertCircle } from "lucide-react";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { userPermission } from "@/mockData/user-permission";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean().optional(),
});

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
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  // Load remembered credentials on component mount
  useEffect(() => {
    console.log("🔍 Checking for remembered credentials...");
    const rememberedCredentials = localStorage.getItem("rememberedCredentials");
    if (rememberedCredentials) {
      try {
        const { email, password } = JSON.parse(rememberedCredentials);
        console.log("✅ Found remembered credentials:", {
          email,
          password: "***",
        });
        setValue("email", email);
        setValue("password", password);
        setRememberMe(true);
        console.log("📝 Auto-filled form with remembered credentials");
      } catch (error) {
        console.error("❌ Error parsing remembered credentials:", error);
        localStorage.removeItem("rememberedCredentials");
        console.log("🗑️ Cleared corrupted remembered credentials");
      }
    } else {
      console.log("❌ No remembered credentials found");
    }
  }, [setValue]);

  const onSubmit = async (data: {
    email: string;
    password: string;
    rememberMe?: boolean;
  }) => {
    console.log("🚀 Login form submitted with data:", {
      email: data.email,
      password: "***",
      rememberMe: data.rememberMe,
    });

    // Clear any previous login errors
    setLoginError("");

    try {
      console.log("⏳ Validating credentials...");

      // Valid email addresses
      const validEmails = ["rapid@gmail.com", "rapid-dev@gmail.com"];

      // Check credentials - allow both email addresses with the same password
      if (
        !validEmails.includes(data.email) ||
        (data.password !== "Rapid@999" && data.password !== "rapid00")
      ) {
        console.log("❌ Invalid credentials provided");
        setLoginError("Invalid email or password. Please try again.");
        return;
      }
      console.log("✅ Credentials validated successfully");

      // Handle remember me functionality
      if (rememberMe) {
        console.log("💾 Saving credentials to localStorage...");
        localStorage.setItem(
          "rememberedCredentials",
          JSON.stringify({
            email: data.email,
            password: data.password,
          })
        );
        console.log("✅ Credentials saved successfully");
      } else {
        console.log("🗑️ Removing remembered credentials...");
        localStorage.removeItem("rememberedCredentials");
        console.log("✅ Remembered credentials cleared");
      }

      console.log("⏳ Simulating API call...");
      // Simulate API call
      await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              token: "sample-jwt-token-123",
              user: { email: data.email },
            }),
          1000
        )
      );
      console.log("✅ API call completed successfully");

      console.log("🍪 Setting auth token in cookies...");
      // Store token in cookie (expires in 7 days)
      Cookies.set("auth_token", "sample-jwt-token-123", {
        expires: 7,
        secure: true,
      });
      console.log("✅ Auth token saved in cookies");

      console.log("🔐 Dispatching login action to Redux...");
      dispatch(
        login({
          userId: data.email,
          userRole: "admin",
          permissions: userPermission,
        })
      );
      console.log("✅ Login successful! Navigating to dashboard...");
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Login failed:", error);
      setLoginError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl text-brand">
            Login to <span className="text-blue-500">Rapid</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            autoComplete="off"
            data-form-type="other"
            data-lpignore="true"
            data-1p-ignore="true"
          >
            {/* Login Error Display */}
            {loginError && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-700">{loginError}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="example@domain.com"
                  className="pl-10"
                  autoComplete="off"
                  data-lpignore="true"
                  data-1p-ignore="true"
                  data-form-type="other"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="••••••••"
                  className="pl-10"
                  autoComplete="off"
                  data-lpignore="true"
                  data-1p-ignore="true"
                  data-form-type="other"
                  style={{ WebkitTextSecurity: "disc" } as React.CSSProperties}
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                checked={rememberMe}
                onCheckedChange={(checked) => {
                  const isChecked = !!checked;
                  setRememberMe(isChecked);
                  setValue("rememberMe", isChecked);
                  console.log("🔘 Remember Me checkbox changed:", isChecked);
                }}
              />
              <label
                htmlFor="rememberMe"
                className="text-sm text-gray-700 dark:text-gray-200"
              >
                Remember me
              </label>
            </div>

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Log In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
