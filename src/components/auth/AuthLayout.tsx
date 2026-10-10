import React from "react";
import {
  Percent,
  ShoppingCart,
  PieChart,
  Calculator,
  Cloud,
} from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import ThemeToggle from "@/components/ThemeToggle";

interface AuthLayoutProps {
  welcomePrefix?: string;
  brandHighlight?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  welcomePrefix = "Welcome to",
  brandHighlight = "ABC Trading LLC",
  title,
  subtitle,
  children,
}) => {
  const keyModules = [
    {
      label: "Sale",
      icon: <Percent className="w-5 h-5 stroke-[2.2]" />,
    },
    {
      label: "Purchase",
      icon: <ShoppingCart className="w-5 h-5 stroke-[2.2]" />,
    },
    {
      label: "Instalment",
      icon: <PieChart className="w-5 h-5 stroke-[2.2]" />,
    },
    {
      label: "Accounts",
      icon: <Calculator className="w-5 h-5 stroke-[2.2]" />,
    },
    {
      label: "Cloud Base",
      icon: <Cloud className="w-5 h-5 stroke-[2.2]" />,
    },
  ];

  return (
    <div className="min-h-screen w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-sans antialiased relative overflow-hidden bg-[#242b38] dark:bg-[#0f172a] selection:bg-[#008fd3] selection:text-white">
      {/* Floating Top Right Controls: Language Switcher & Theme Switcher */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-8 z-50 flex items-center gap-1.5 bg-white/15 dark:bg-slate-900/60 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/25 shadow-lg text-white">
        <LanguageSelector triggerClassName="text-white hover:text-white hover:bg-white/20" />
        <ThemeToggle className="text-white hover:text-white hover:bg-white/20" />
      </div>

      {/* Background C: Rich Glassmorphic Ambient Lighting & Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft diffused spotlight at top */}
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(ellipse 90% 60% at 50% 0%, rgba(100, 116, 139, 0.45) 0%, rgba(30, 36, 48, 0.9) 70%, rgba(15, 20, 28, 1) 100%)",
          }}
        />

        {/* Ambient Glowing Orbs providing glassmorphism depth */}
        <div className="absolute -top-24 left-1/4 w-[36rem] h-[36rem] bg-[#008fd3]/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-20 w-[32rem] h-[32rem] bg-[#0070ba]/25 rounded-full blur-[130px]" />
        <div className="absolute -bottom-24 left-1/3 w-[38rem] h-[38rem] bg-slate-400/15 rounded-full blur-[140px]" />

        {/* Frosted Glass Specular Sheen across background */}
        <div
          className="absolute inset-0 opacity-25 backdrop-blur-[40px]"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.03) 50%, rgba(0,0,0,0.2) 100%)",
          }}
        />
      </div>

      {/* Main Container Card */}
      <div className="relative z-10 w-full max-w-[1140px] bg-white dark:bg-slate-900 rounded-[28px] sm:rounded-[36px] shadow-[0_25px_80px_rgba(0,10,30,0.45)] overflow-hidden flex flex-col">
        {/* Split Background Layers */}
        {/* Top Half: SAP Blue Gradient matching Image 2 with comfortable height for Spacing A */}
        <div className="absolute top-0 left-0 right-0 h-[52%] sm:h-[53%] bg-gradient-to-r from-[#008fd3] via-[#0070ba] to-[#005e9e] overflow-hidden">
          {/* Subtle SAP-style geometric highlight */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background:
                "linear-gradient(120deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%, rgba(0,40,80,0.35) 100%)",
            }}
          />
          {/* Soft ambient lighting */}
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/15 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 right-1/4 w-72 h-72 bg-[#008fd3]/30 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Bottom Half: Clean White / Dark Background */}
        <div className="absolute bottom-0 left-0 right-0 h-[48%] sm:h-[47%] bg-white dark:bg-slate-900" />

        {/* Foreground Content */}
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 p-6 sm:p-8 lg:p-10 items-center gap-6 lg:gap-8">
          {/* Left Column: Brand, Description, Key Modules */}
          <div className="lg:col-span-7 flex flex-col justify-between self-stretch pr-0 lg:pr-4 py-2">
            {/* Top Section: Brand & Description */}
            <div className="pb-8 sm:pb-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center p-2 border border-white/30 shadow-inner">
                  <svg
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full text-white drop-shadow-sm"
                  >
                    <path
                      d="M8 34L14 14L22 28L28 14L34 26"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19 35L24 40L40 18"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M32 18H40V26"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                    ABC Trading LLC
                  </h1>
                </div>
              </div>

              {/* Subtitle / Description Paragraphs */}
              <div className="space-y-2 mt-3 max-w-lg text-white/90 text-xs sm:text-[13px] leading-relaxed">
                <p>
                  ABC Trading LLC is a comprehensive, all-in-one accounting and
                  business management solution designed specifically for mobile
                  shop owners and electronics retailers.
                </p>
                <p className="text-white/80 hidden sm:block">
                  From tracking daily sales and purchases to managing complex
                  Charts of Accounts, ABC Trading LLC simplifies your financial
                  operations with precision and speed.
                </p>
              </div>
            </div>

            {/* Bottom Section: Key Modules */}
            <div className="pt-6 sm:pt-8 flex flex-col justify-between flex-1">
              <div>
                <h2 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white tracking-wide mb-3">
                  Key Modules
                </h2>

                <div className="grid grid-cols-5 gap-2 sm:gap-3 max-w-sm sm:max-w-md">
                  {keyModules.map((module) => (
                    <div
                      key={module.label}
                      className="flex flex-col items-center group cursor-pointer"
                    >
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#f0f7fe] dark:bg-slate-800 border border-[#d2e7f8] dark:border-slate-700 flex items-center justify-center text-[#0070ba] dark:text-[#38bdf8] group-hover:bg-[#0070ba] group-hover:text-white group-hover:border-[#0070ba] group-hover:scale-105 group-hover:shadow-sm transition-all duration-200">
                        {module.icon}
                      </div>
                      <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300 mt-1.5 text-center truncate w-full group-hover:text-[#0070ba] dark:group-hover:text-[#38bdf8] transition-colors">
                        {module.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Powered by Rapid ERP */}
              <div className="mt-8 sm:mt-10 pt-2">
                <p className="text-xs text-slate-400 font-medium tracking-wide">
                  Powered by <span className="text-[#0070ba] font-semibold">Rapid ERP</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Auth Form Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[420px] bg-white dark:bg-slate-800/95 rounded-3xl shadow-[0_15px_45px_rgba(0,35,80,0.15)] p-6 sm:p-8 border border-slate-100 dark:border-slate-700 flex flex-col justify-center relative">
              {/* Header inside Form Card */}
              <div className="mb-4 sm:mb-5">
                <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
                  {welcomePrefix}{" "}
                  <span className="text-[#0070ba] font-bold">
                    {brandHighlight}
                  </span>
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mt-0.5">
                  {title}
                </h3>
                {subtitle && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {subtitle}
                  </p>
                )}
              </div>

              {/* Form Content */}
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
