"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  FileText,
  Menu,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#111111]">
      {/* ==================== NAVBAR ==================== */}
      <nav className="sticky top-0 z-50 border-b border-[#E5E7EB] bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#111111] text-white">
              <Sparkles size={18} />
            </div>

            <span className="text-xl font-bold tracking-tight">
              JobPilot
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm font-medium text-gray-600 transition hover:text-black"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="text-sm font-medium text-gray-600 transition hover:text-black"
            >
              How it works
            </a>

            <a
              href="#pricing"
              className="text-sm font-medium text-gray-600 transition hover:text-black"
            >
              Pricing
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            <a href="/login" className="px-4 py-2 text-sm font-medium text-gray-700 transition hover:text-black" >
              Log in
            </a>

            <a  href="/signup" className="rounded-lg bg-[#111111] px-4 py-2 text-sm font-medium text-white transition hover:bg-black">
              Get started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-[#E5E7EB] bg-white px-6 py-5 md:hidden">
            <div className="flex flex-col gap-4">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-gray-700"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-gray-700"
              >
                How it works
              </a>

              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-gray-700"
              >
                Pricing
              </a>

              <div className="flex gap-3 border-t border-gray-100 pt-4">
                <a  href="/login" 
                onClick={() => setMobileMenuOpen(false)} 
                className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium">
                  Log in
                </a>

                <a  href="/login" 
                onClick={() => setMobileMenuOpen(false)} 
                className="flex-1 rounded-lg bg-[#111111] px-4 py-2 text-sm font-medium text-white">
                  Get started
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:py-28">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm">
              <Sparkles size={15} />
              AI-powered career platform
            </div>

            {/* Heading */}
            <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Your resume shouldn't be the reason you get rejected.
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              JobPilot analyzes your resume against real job descriptions,
              identifies what's missing, and helps you create stronger,
              application-ready documents.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button className="group flex items-center justify-center gap-2 rounded-lg bg-[#111111] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-black">
                Analyze my resume

                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

              <button className="rounded-lg border border-gray-300 bg-white px-6 py-3.5 text-sm font-semibold text-gray-800 transition hover:bg-gray-50">
                See how it works
              </button>
            </div>

            {/* Trust Points */}
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              <TrustPoint text="AI resume analysis" />
              <TrustPoint text="Job matching" />
              <TrustPoint text="Application tracking" />
            </div>
          </motion.div>

          {/* Product Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl shadow-gray-200/50">
              {/* Preview Header */}
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <FileText size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Software Engineer Resume
                    </p>

                    <p className="text-xs text-gray-500">
                      Last analyzed just now
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                  Strong
                </span>
              </div>

              {/* ATS Score */}
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      ATS Compatibility
                    </p>

                    <p className="mt-1 text-4xl font-bold">87</p>
                  </div>

                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-8 border-green-100">
                    <div className="text-sm font-bold text-green-700">
                      87%
                    </div>
                  </div>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full w-[87%] rounded-full bg-green-500" />
                </div>
              </div>

              {/* Analysis Grid */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <AnalysisItem
                  label="Job Match"
                  value="92%"
                  positive
                />

                <AnalysisItem
                  label="Keywords"
                  value="38 / 42"
                  positive
                />

                <AnalysisItem
                  label="Skills Found"
                  value="24"
                  positive
                />

                <AnalysisItem
                  label="Improvements"
                  value="5"
                  warning
                />
              </div>

              {/* Skills */}
              <div className="mt-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Matched Skills
                </p>

                <div className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "TypeScript",
                    "Node.js",
                    "PostgreSQL",
                    "REST APIs",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Recommendation */}
              <div className="mt-5 rounded-xl border border-indigo-100 bg-indigo-50/60 p-4">
                <div className="flex gap-3">
                  <div className="mt-0.5">
                    <Sparkles
                      size={17}
                      className="text-indigo-600"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      AI recommendation
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-600">
                      Add measurable impact to your project descriptions and
                      highlight your API development experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Match Card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-6 -left-6 hidden rounded-xl border border-gray-200 bg-white p-4 shadow-xl sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
                  <Target
                    size={18}
                    className="text-green-600"
                  />
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Match improved
                  </p>

                  <p className="text-sm font-bold">
                    72% → 92%
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ==================== TRUST STRIP ==================== */}
      <section className="border-y border-gray-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-gray-200 sm:grid-cols-4">
          <Stat
            value="10x"
            label="Faster job preparation"
          />

          <Stat
            value="87%"
            label="Average ATS score"
          />

          <Stat
            value="92%"
            label="Average job match"
          />

          <Stat
            value="24/7"
            label="AI career assistance"
          />
        </div>
      </section>

      {/* ==================== FEATURES ==================== */}
      <section
        id="features"
        className="mx-auto max-w-7xl px-6 py-24"
      >
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Everything you need
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            One platform for your entire job search.
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            From your first resume scan to your final application,
            JobPilot helps you make every step more effective.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<FileText size={20} />}
            title="AI Resume Analyzer"
            description="Analyze your resume for ATS compatibility, structure, keywords, skills, and improvement opportunities."
          />

          <FeatureCard
            icon={<Target size={20} />}
            title="Job Match Score"
            description="Compare your resume against a job description and understand exactly how well you match."
          />

          <FeatureCard
            icon={<Sparkles size={20} />}
            title="AI Resume Tailoring"
            description="Generate targeted resume improvements based on the requirements of a specific role."
          />

          <FeatureCard
            icon={<FileText size={20} />}
            title="Cover Letter Generator"
            description="Create personalized cover letters using your resume and the job description."
          />

          <FeatureCard
            icon={<Target size={20} />}
            title="Application Tracker"
            description="Track applications through a clean Kanban workflow from saved to interview to offer."
          />

          <FeatureCard
            icon={<Sparkles size={20} />}
            title="AI Career Assistant"
            description="Get intelligent suggestions for applications, skills, interviews, and career decisions."
          />
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section
        id="how-it-works"
        className="border-y border-gray-200 bg-white"
      >
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              How it works
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              From resume to application-ready in minutes.
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              JobPilot turns a complicated job search into a simple,
              data-driven workflow.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <StepCard
              number="01"
              title="Upload your resume"
              description="Upload your PDF resume and let JobPilot analyze your experience, skills, keywords, and structure."
            />

            <StepCard
              number="02"
              title="Match with a job"
              description="Paste any job description to discover your match score, missing keywords, and skill gaps."
            />

            <StepCard
              number="03"
              title="Apply with confidence"
              description="Tailor your resume, generate a cover letter, and track your application from one dashboard."
            />
          </div>
        </div>
      </section>

      {/* ==================== PRICING ==================== */}
      <section
        id="pricing"
        className="mx-auto max-w-7xl px-6 py-24"
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Simple pricing
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Start free. Upgrade when you need more.
          </h2>

          <p className="mt-5 text-lg text-gray-600">
            Everything you need to start building a better job search.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="flex items-end gap-2">
            <span className="text-5xl font-bold">$0</span>

            <span className="mb-1 text-gray-500">
              / month
            </span>
          </div>

          <p className="mt-3 text-gray-600">
            Perfect for getting started.
          </p>

          <button className="mt-6 w-full rounded-lg bg-[#111111] px-5 py-3 text-sm font-semibold text-white transition hover:bg-black">
            Get started for free
          </button>

          <div className="mt-8 space-y-4">
            <PricingFeature text="Resume analysis" />
            <PricingFeature text="Basic job matching" />
            <PricingFeature text="AI recommendations" />
            <PricingFeature text="Application tracking" />
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="border-t border-gray-200 bg-[#111111]">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-black">
            <Sparkles size={22} />
          </div>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Stop guessing. Start applying smarter.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-400">
            Let AI help you understand your resume, match better jobs,
            improve your applications, and move your career forward.
          </p>

          <button className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-gray-100">
            Build my application strategy

            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-[#111111]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 border-t border-white/10 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black">
              <Sparkles size={16} />
            </div>

            <span className="font-semibold text-white">
              JobPilot
            </span>
          </div>

          <p className="text-sm text-gray-500">
            AI-powered tools for a smarter job search.
          </p>

          <p className="text-sm text-gray-500">
            © 2026 JobPilot
          </p>
        </div>
      </footer>
    </main>
  );
}

/* ==================== SMALL COMPONENTS ==================== */

function TrustPoint({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-50">
        <Check
          size={12}
          className="text-green-600"
        />
      </div>

      {text}
    </div>
  );
}

function AnalysisItem({
  label,
  value,
  positive,
  warning,
}: {
  label: string;
  value: string;
  positive?: boolean;
  warning?: boolean;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4">
      <p className="text-xs text-gray-500">
        {label}
      </p>

      <p
        className={`mt-1 text-lg font-bold ${
          positive
            ? "text-green-600"
            : warning
              ? "text-amber-600"
              : "text-gray-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group rounded-2xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-gray-200/40"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-900 transition group-hover:bg-gray-900 group-hover:text-white">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-600">
        {description}
      </p>

      <div className="mt-5 flex items-center gap-1 text-sm font-medium text-gray-900">
        Learn more
        <ArrowRight size={14} />
      </div>
    </motion.div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-[#FAFAFA] p-7">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#111111] text-sm font-bold text-white">
        {number}
      </div>

      <h3 className="mt-6 text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-gray-600">
        {description}
      </p>
    </div>
  );
}

function PricingFeature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-gray-700">
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-50">
        <Check
          size={12}
          className="text-green-600"
        />
      </div>

      {text}
    </div>
  );
}

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="px-4 py-7 text-center sm:px-6">
      <p className="text-2xl font-bold tracking-tight">
        {value}
      </p>

      <p className="mt-1 text-xs text-gray-500 sm:text-sm">
        {label}
      </p>
    </div>
  );
}