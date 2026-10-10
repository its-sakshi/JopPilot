"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  FileText,
  Lock,
  Mail,
  User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#111111]">
      <div className="flex min-h-screen">
        {/* Left Panel */}
        <section className="relative hidden overflow-hidden bg-[#111111] text-white lg:flex lg:w-[46%]">
          <div className="absolute inset-0">
            <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#635BFF]/10 blur-3xl" />
            <div className="absolute bottom-10 right-0 h-80 w-80 rounded-full bg-[#635BFF]/10 blur-3xl" />
          </div>

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                <FileText className="h-5 w-5 text-[#111111]" />
              </div>

              <span className="text-xl font-semibold tracking-tight">
                JobPilot
              </span>
            </Link>

            {/* Main Content */}
            <div className="max-w-lg">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="mb-4 text-sm font-medium text-gray-400">
                  YOUR CAREER, OPTIMIZED
                </p>

                <h1 className="text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">
                  Build a resume that gets you noticed.
                </h1>

                <p className="mt-6 max-w-md text-base leading-7 text-gray-400">
                  JobPilot helps you analyze your resume, match your skills
                  with real opportunities, and apply with confidence.
                </p>
              </motion.div>

              {/* Benefits */}
              <div className="mt-10 space-y-5">
                <Benefit text="AI-powered resume analysis" />
                <Benefit text="Smart job matching" />
                <Benefit text="ATS optimization insights" />
                <Benefit text="Application tracking in one place" />
              </div>
            </div>

            {/* Bottom Text */}
            <p className="text-sm text-gray-500">
              Your next opportunity starts here.
            </p>
          </div>
        </section>

        {/* Right Panel */}
        <section className="flex w-full items-center justify-center px-6 py-10 sm:px-10 lg:w-[54%] lg:px-16">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="mb-10 flex justify-center lg:hidden">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#111111]">
                  <FileText className="h-5 w-5 text-white" />
                </div>

                <span className="text-xl font-semibold tracking-tight">
                  JobPilot
                </span>
              </Link>
            </div>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl font-semibold tracking-tight">
                Create your account
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Start building a stronger job application today.
              </p>
            </motion.div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="mt-8 space-y-5"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Full name
                </label>

                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#111111] focus:ring-2 focus:ring-gray-100"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#111111] focus:ring-2 focus:ring-gray-100"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-11 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#111111] focus:ring-2 focus:ring-gray-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                <p className="mt-2 text-xs text-gray-400">
                  Use at least 8 characters.
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Confirm password
                </label>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                  <input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-11 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#111111] focus:ring-2 focus:ring-gray-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setAgreeToTerms(!agreeToTerms)}
                  className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${
                    agreeToTerms
                      ? "border-[#111111] bg-[#111111] text-white"
                      : "border-gray-300 bg-white"
                  }`}
                  aria-label="Agree to terms"
                >
                  {agreeToTerms && <Check className="h-3 w-3" />}
                </button>

                <p className="text-xs leading-5 text-gray-500">
                  I agree to the{" "}
                  <button
                    type="button"
                    className="font-medium text-gray-700 hover:text-black"
                  >
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    className="font-medium text-gray-700 hover:text-black"
                  >
                    Privacy Policy
                  </button>
                  .
                </p>
              </div>

              {/* Create Account */}
              <button
                type="submit"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#111111] text-sm font-medium text-white transition hover:bg-black"
              >
                Create account
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.form>

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-400">OR</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Google */}
            <button
              type="button"
              className="flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            {/* Login Link */}
            <p className="mt-8 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-[#111111] hover:underline"
              >
                Sign in
              </Link>
            </p>

            {/* Footer */}
            <p className="mt-8 text-center text-xs text-gray-400">
              By creating an account, you can start using JobPilot's career
              tools and insights.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

/* Benefit Component */
function Benefit({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-700">
        <Check className="h-3.5 w-3.5 text-gray-300" />
      </div>

      <span className="text-sm text-gray-300">{text}</span>
    </div>
  );
}

/* Google Icon */
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
        d="M21.35 12.27c0-.68-.06-1.34-.17-1.97H12v3.73h5.23a4.47 4.47 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.92-4.18 2.92-7.15Z"
      />
      <path
        fill="#34A853"
        d="M12 21.7c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.7Z"
      />
      <path
        fill="#FBBC05"
        d="M6.54 13.78A5.85 5.85 0 0 1 6.23 12c0-.62.11-1.22.31-1.78V7.69H3.3A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.31l3.24-2.53Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.19c1.43 0 2.72.49 3.73 1.45l2.8-2.8C16.84 3.27 14.63 2.3 12 2.3a9.74 9.74 0 0 0-8.7 5.39l3.24 2.53C6.81 7.91 9.46 6.19 12 6.19Z"
      />
    </svg>
  );
}