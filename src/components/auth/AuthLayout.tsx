import React from "react";

interface AuthLayoutProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  badge = "WELCOME BACK",
  title = "Sign in to start your session",
  subtitle,
  children,
}) => {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('/images/background.png')",
        backgroundColor: "#638bee",
      }}
    >
      {/* Subtle backdrop overlay for enhanced contrast */}
      <div className="absolute inset-0 bg-blue-900/10 backdrop-blur-[1px] pointer-events-none" />

      {/* Main Split Card */}
      <div className="relative z-10 w-full max-w-[860px] bg-white dark:bg-slate-900 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col md:flex-row transition-all duration-300">
        {/* Left Side: Brand Banner ("RAPID ERP") */}
        <div className="w-full md:w-[46%] bg-gradient-to-br from-[#3cb0f7] via-[#2ba0ee] to-[#1a85db] p-8 sm:p-10 md:p-12 flex flex-col items-center justify-center text-center relative overflow-hidden select-none min-h-[180px] md:min-h-[460px]">
          {/* Subtle decorative circles */}
          <div className="absolute -top-16 -left-16 w-48 h-48 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-52 h-52 bg-white/15 rounded-full blur-xl pointer-events-none" />

          {/* Typography matching reference image */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-wider leading-[1.08] drop-shadow-sm font-sans uppercase">
              RAPID
            </h1>
          </div>
        </div>

        {/* Right Side: Form Content */}
        <div className="w-full md:w-[54%] p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center bg-white dark:bg-slate-900">
          {/* Header */}
          <div className="text-center mb-6">
            {badge && (
              <span className="text-[11px] sm:text-xs font-bold tracking-widest text-[#2ba0ee] uppercase block mb-1">
                {badge}
              </span>
            )}
            <h2 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white leading-snug">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {subtitle}
              </p>
            )}
          </div>

          {/* Form Body */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
