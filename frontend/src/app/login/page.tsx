"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#111111]">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* ==================== LEFT SIDE ==================== */}

        <section className="relative hidden overflow-hidden bg-[#111111] lg:flex">
          <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
            {/* Logo */}
            <Link
              href="/"
              className="flex w-fit items-center gap-2 text-white"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-black">
                <Sparkles size={18} />
              </div>

              <span className="text-xl font-bold tracking-tight">
                JobPilot
              </span>
            </Link>

            {/* Main Message */}
            <div className="max-w-lg">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-gray-300">
                <Sparkles size={14} />
                AI-powered career platform
              </div>

              <h1 className="text-4xl font-bold leading-tight text-white xl:text-5xl">
                Your next opportunity starts with a better application.
              </h1>

              <p className="mt-6 text-base leading-7 text-gray-400">
                Analyze your resume, match with the right jobs, improve your
                applications, and keep your entire job search organized in one
                place.
              </p>

              {/* Benefits */}
              <div className="mt-8 space-y-4">
                <Benefit text="AI-powered resume analysis" />
                <Benefit text="Intelligent job matching" />
                <Benefit text="Personalized application insights" />
              </div>
            </div>

            {/* Bottom */}
            <p className="text-sm text-gray-500">
              © 2026 JobPilot. Built for smarter job searches.
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full border border-white/5" />
          <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full border border-white/5" />
        </section>

        {/* ==================== RIGHT SIDE ==================== */}

        <section className="flex min-h-screen items-center justify-center px-6 py-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            {/* Mobile Logo */}
            <div className="mb-10 lg:hidden">
              <Link
                href="/"
                className="flex w-fit items-center gap-2"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#111111] text-white">
                  <Sparkles size={18} />
                </div>

                <span className="text-xl font-bold tracking-tight">
                  JobPilot
                </span>
              </Link>
            </div>

            {/* Back to Home */}
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900"
            >
              <ArrowLeft size={15} />
              Back to home
            </Link>

            {/* Heading */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Welcome back
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Sign in to continue managing your job search.
              </p>
            </div>

            {/* Login Form */}
            <form className="mt-8 space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-800"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-medium text-gray-500 transition hover:text-gray-900"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <Lock
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-11 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                />

                <label
                  htmlFor="remember"
                  className="text-sm text-gray-600"
                >
                  Remember me
                </label>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="h-11 w-full rounded-lg bg-[#111111] text-sm font-semibold text-white transition hover:bg-black"
              >
                Sign in
              </button>
            </form>

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />

              <span className="text-xs text-gray-400">
                OR
              </span>

              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Google Button */}
            <button
              type="button"
              className="flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            {/* Signup */}
            <p className="mt-8 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-gray-900 hover:underline"
              >
                Create an account
              </Link>
            </p>
          </motion.div>
        </section>
      </div>
    </main>
  );
}

/* ==================== BENEFIT ==================== */

function Benefit({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M2.5 6L5 8.5L9.5 3.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          />
        </svg>
      </div>

      <span className="text-sm text-gray-300">
        {text}
      </span>
    </div>
  );
}

/* ==================== GOOGLE ICON ==================== */

function GoogleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h6.44a5.5 5.5 0 0 1-2.39 3.61v3h3.87c2.27-2.09 3.57-5.17 3.57-8.64Z"
      />

      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.87-3c-1.07.72-2.43 1.15-4.08 1.15-3.13 0-5.79-2.11-6.74-4.95H1.26v3.09A12 12 0 0 0 12 24Z"
      />

      <path
        fill="#FBBC05"
        d="M5.26 14.29A7.24 7.24 0 0 1 4.88 12c0-.79.14-1.56.38-2.29V6.62H1.26A12 12 0 0 0 0 12c0 1.94.46 3.78 1.26 5.38l4-3.09Z"
      />

      <path
        fill="#EA4335"
        d="M12 4.76c1.76 0 3.34.61 4.59 1.8l3.44-3.44C17.95 1.11 15.24 0 12 0A12 12 0 0 0 1.26 6.62l4 3.09C6.21 6.87 8.87 4.76 12 4.76Z"
      />
    </svg>
  );
}