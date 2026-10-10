"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Bell,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  CircleUserRound,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Sparkles,
  Target,
  TrendingUp,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#111111]">
      <div className="flex min-h-screen">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-gray-100 px-5">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#111111]">
                <FileText className="h-4 w-4 text-white" />
              </div>

              <span className="text-lg font-semibold tracking-tight">
                JobPilot
              </span>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-5">
            <SidebarItem
              icon={<LayoutDashboard className="h-4 w-4" />}
              label="Overview"
              href="/dashboard"
              active
            />

            <SidebarItem
              icon={<FileText className="h-4 w-4" />}
              label="Resume"
              href="/dashboard/resume"
            />

            <SidebarItem
              icon={<Target className="h-4 w-4" />}
              label="Job Matches"
              href="/dashboard/jobs"
            />

            <SidebarItem
              icon={<BriefcaseBusiness className="h-4 w-4" />}
              label="Applications"
              href="/dashboard/applications"
            />

            <SidebarItem
              icon={<Sparkles className="h-4 w-4" />}
              label="AI Assistant"
              href="/dashboard/assistant"
            />

            <div className="my-5 border-t border-gray-100" />

            <SidebarItem
              icon={<Settings className="h-4 w-4" />}
              label="Settings"
              href="#"
            />
          </nav>

          {/* Upgrade Card */}
          <div className="mx-3 mb-4 rounded-xl border border-gray-200 bg-[#FAFAFA] p-4">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
              <Sparkles className="h-4 w-4 text-[#635BFF]" />
            </div>

            <p className="text-sm font-semibold">Unlock more insights</p>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Get advanced AI resume analysis and job matching.
            </p>

            <button className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#111111] hover:underline">
              Explore features
              <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>

          {/* User */}
          <div className="border-t border-gray-100 p-3">
            <div className="flex items-center gap-3 rounded-lg px-2 py-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
                <CircleUserRound className="h-5 w-5 text-gray-500" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">Your Name</p>
                <p className="truncate text-xs text-gray-400">
                  you@example.com
                </p>
              </div>

              <button className="text-gray-400 hover:text-gray-700">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Area */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>

              <div>
                <h1 className="text-sm font-semibold sm:text-base">
                  Dashboard
                </h1>

                <p className="hidden text-xs text-gray-400 sm:block">
                  Your career overview
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search */}
              <button className="hidden items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-400 transition hover:border-gray-300 hover:text-gray-600 md:flex">
                <Search className="h-4 w-4" />
                <span>Search</span>
                <kbd className="ml-5 rounded border border-gray-200 px-1.5 py-0.5 text-[10px]">
                  /
                </kbd>
              </button>

              {/* Notifications */}
              <button className="relative rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800">
                <Bell className="h-5 w-5" />

                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#635BFF]" />
              </button>

              {/* Avatar */}
              <button className="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-gray-100">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                  <CircleUserRound className="h-4 w-4 text-gray-500" />
                </div>

                <ChevronDown className="hidden h-4 w-4 text-gray-400 sm:block" />
              </button>
            </div>
          </header>

          {/* Content */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
              {/* Welcome */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
              >
                <div>
                  <p className="mb-2 text-sm text-gray-500">Good morning 👋</p>

                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Welcome back, Your Name
                  </h2>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                    Here's a quick look at your resume performance and job
                    search progress.
                  </p>
                </div>

                <button className="flex w-fit items-center justify-center gap-2 rounded-lg bg-[#111111] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-black">
                  <Plus className="h-4 w-4" />
                  Add application
                </button>
              </motion.div>

              {/* Stats */}
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <DashboardStat
                  icon={<FileText className="h-4 w-4" />}
                  label="Resume Score"
                  value="87"
                  suffix="/100"
                  change="+12%"
                  positive
                />

                <DashboardStat
                  icon={<Target className="h-4 w-4" />}
                  label="Job Match"
                  value="92"
                  suffix="%"
                  change="+8%"
                  positive
                />

                <DashboardStat
                  icon={<BriefcaseBusiness className="h-4 w-4" />}
                  label="Applications"
                  value="24"
                  change="+6 this week"
                  positive
                />

                <DashboardStat
                  icon={<TrendingUp className="h-4 w-4" />}
                  label="Profile Views"
                  value="148"
                  change="+18%"
                  positive
                />
              </div>

              {/* Main Grid */}
              <div className="mt-6 grid gap-6 xl:grid-cols-3">
                {/* Resume Analysis */}
                <motion.section
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="rounded-xl border border-gray-200 bg-white xl:col-span-2"
                >
                  <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                    <div>
                      <h3 className="text-sm font-semibold">
                        Resume performance
                      </h3>

                      <p className="mt-1 text-xs text-gray-400">
                        Latest AI analysis
                      </p>
                    </div>

                    <button className="text-xs font-medium text-gray-500 hover:text-black">
                      View analysis
                    </button>
                  </div>

                  <div className="p-5">
                    <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
                      {/* Score */}
                      <div className="flex shrink-0 justify-center">
                        <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-[10px] border-gray-100">
                          <div className="absolute inset-[-10px] rounded-full border-[10px] border-transparent border-t-[#111111] border-r-[#111111] rotate-[25deg]" />

                          <div className="text-center">
                            <p className="text-3xl font-semibold">87</p>
                            <p className="text-xs text-gray-400">ATS Score</p>
                          </div>
                        </div>
                      </div>

                      {/* Analysis */}
                      <div className="flex-1">
                        <div className="mb-5 flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100">
                            <Sparkles className="h-3.5 w-3.5" />
                          </div>

                          <p className="text-sm font-medium">
                            Your resume is performing well
                          </p>
                        </div>

                        <div className="space-y-4">
                          <ProgressItem
                            label="Keywords"
                            value="38 / 42"
                            percentage={90}
                          />

                          <ProgressItem
                            label="Skills"
                            value="16 / 18"
                            percentage={89}
                          />

                          <ProgressItem
                            label="Formatting"
                            value="Excellent"
                            percentage={95}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-7 flex flex-col gap-3 rounded-lg border border-gray-200 bg-[#FAFAFA] p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-medium">
                          Improve your score to 95+
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Add 4 missing keywords to improve ATS compatibility.
                        </p>
                      </div>

                      <button className="flex w-fit items-center gap-1 text-xs font-semibold text-[#111111] hover:underline">
                        Fix now
                        <ArrowUpRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </motion.section>

                {/* AI Insights */}
                <motion.section
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="rounded-xl border border-gray-200 bg-white"
                >
                  <div className="border-b border-gray-100 px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100">
                        <Sparkles className="h-3.5 w-3.5" />
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold">AI insights</h3>
                        <p className="text-xs text-gray-400">
                          Personalized recommendations
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5 p-5">
                    <Insight
                      number="01"
                      title="Add TypeScript"
                      description="12 matching jobs mention TypeScript as a preferred skill."
                    />

                    <Insight
                      number="02"
                      title="Improve your summary"
                      description="A stronger opening could increase recruiter engagement."
                    />

                    <Insight
                      number="03"
                      title="Apply to more matches"
                      description="You have 8 high-match opportunities waiting."
                    />

                    <button className="flex w-full items-center justify-center gap-1 rounded-lg border border-gray-200 py-2.5 text-xs font-medium transition hover:bg-gray-50">
                      View all insights
                      <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </div>
                </motion.section>
              </div>

              {/* Bottom Grid */}
              <div className="mt-6 grid gap-6 xl:grid-cols-2">
                {/* Job Matches */}
                <motion.section
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="rounded-xl border border-gray-200 bg-white"
                >
                  <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                    <div>
                      <h3 className="text-sm font-semibold">
                        Recommended jobs
                      </h3>

                      <p className="mt-1 text-xs text-gray-400">
                        Based on your profile
                      </p>
                    </div>

                    <button className="text-xs font-medium text-gray-500 hover:text-black">
                      View all
                    </button>
                  </div>

                  <div className="divide-y divide-gray-100">
                    <JobItem
                      company="TechNova"
                      role="Full Stack Developer"
                      location="Remote"
                      match="96%"
                    />

                    <JobItem
                      company="CloudPeak"
                      role="Software Engineer"
                      location="Bengaluru"
                      match="92%"
                    />

                    <JobItem
                      company="DataFlow"
                      role="Frontend Developer"
                      location="Noida"
                      match="89%"
                    />

                    <JobItem
                      company="BuildLabs"
                      role="React Developer"
                      location="Remote"
                      match="87%"
                    />
                  </div>
                </motion.section>

                {/* Applications */}
                <motion.section
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  className="rounded-xl border border-gray-200 bg-white"
                >
                  <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                    <div>
                      <h3 className="text-sm font-semibold">
                        Recent applications
                      </h3>

                      <p className="mt-1 text-xs text-gray-400">
                        Track your job search
                      </p>
                    </div>

                    <button className="text-xs font-medium text-gray-500 hover:text-black">
                      View tracker
                    </button>
                  </div>

                  <div className="divide-y divide-gray-100">
                    <ApplicationItem
                      company="Microsoft"
                      role="Software Engineer"
                      status="Interview"
                      statusType="positive"
                    />

                    <ApplicationItem
                      company="Amazon"
                      role="SDE Intern"
                      status="Applied"
                      statusType="neutral"
                    />

                    <ApplicationItem
                      company="Google"
                      role="Frontend Engineer"
                      status="Under Review"
                      statusType="warning"
                    />

                    <ApplicationItem
                      company="Adobe"
                      role="Software Developer"
                      status="Rejected"
                      statusType="negative"
                    />
                  </div>
                </motion.section>
              </div>

              {/* Quick Actions */}
              <motion.section
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mt-6"
              >
                <div className="mb-4">
                  <h3 className="text-sm font-semibold">Quick actions</h3>
                  <p className="mt-1 text-xs text-gray-400">
                    Common tasks to keep your job search moving.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <QuickAction
                    icon={<FileText className="h-4 w-4" />}
                    title="Analyze resume"
                    description="Get your ATS score"
                  />

                  <QuickAction
                    icon={<Search className="h-4 w-4" />}
                    title="Find jobs"
                    description="Discover new matches"
                  />

                  <QuickAction
                    icon={<BriefcaseBusiness className="h-4 w-4" />}
                    title="Track application"
                    description="Add a new application"
                  />

                  <QuickAction
                    icon={<Sparkles className="h-4 w-4" />}
                    title="Ask AI"
                    description="Get career guidance"
                  />
                </div>
              </motion.section>

              {/* Footer */}
              <footer className="mt-10 flex flex-col justify-between gap-3 border-t border-gray-200 pt-6 text-xs text-gray-400 sm:flex-row">
                <p>© 2026 JobPilot. All rights reserved.</p>

                <div className="flex gap-5">
                  <button className="hover:text-gray-700">
                    Help center
                  </button>

                  <button className="hover:text-gray-700">
                    Privacy
                  </button>

                  <button className="flex items-center gap-1 hover:text-gray-700">
                    <LogOut className="h-3 w-3" />
                    Sign out
                  </button>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/* Sidebar Item */

function SidebarItem({
  icon,
  label,
  href,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
        active
          ? "bg-gray-100 font-medium text-[#111111]"
          : "text-gray-500 hover:bg-gray-50 hover:text-[#111111]"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

/* Dashboard Stat */

function DashboardStat({
  icon,
  label,
  value,
  suffix,
  change,
  positive,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  suffix?: string;
  change: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
          {icon}
        </div>

        <span
          className={`text-xs font-medium ${
            positive ? "text-green-600" : "text-gray-400"
          }`}
        >
          {change}
        </span>
      </div>

      <p className="mt-5 text-xs text-gray-500">{label}</p>

      <p className="mt-1 text-2xl font-semibold tracking-tight">
        {value}
        {suffix && (
          <span className="text-sm font-normal text-gray-400">{suffix}</span>
        )}
      </p>
    </div>
  );
}

/* Progress Item */

function ProgressItem({
  label,
  value,
  percentage,
}: {
  label: string;
  value: string;
  percentage: number;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="font-medium text-gray-600">{label}</span>
        <span className="text-gray-400">{value}</span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-[#111111]"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

/* AI Insight */

function Insight({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3">
      <span className="text-[10px] font-semibold text-gray-400">{number}</span>

      <div>
        <p className="text-sm font-medium">{title}</p>

        <p className="mt-1 text-xs leading-5 text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
}

/* Job Item */

function JobItem({
  company,
  role,
  location,
  match,
}: {
  company: string;
  role: string;
  location: string;
  match: string;
}) {
  return (
    <div className="flex items-center gap-3 px-5 py-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs font-semibold">
        {company.charAt(0)}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{role}</p>

        <p className="mt-1 text-xs text-gray-400">
          {company} · {location}
        </p>
      </div>

      <div className="text-right">
        <p className="text-xs font-semibold text-green-600">{match}</p>

        <p className="mt-1 text-[10px] text-gray-400">match</p>
      </div>
    </div>
  );
}

/* Application Item */

function ApplicationItem({
  company,
  role,
  status,
  statusType,
}: {
  company: string;
  role: string;
  status: string;
  statusType: "positive" | "neutral" | "warning" | "negative";
}) {
  const statusStyles = {
    positive: "bg-green-50 text-green-700",
    neutral: "bg-gray-100 text-gray-600",
    warning: "bg-yellow-50 text-yellow-700",
    negative: "bg-red-50 text-red-600",
  };

  return (
    <div className="flex items-center gap-3 px-5 py-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100">
        <BriefcaseBusiness className="h-4 w-4 text-gray-500" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{role}</p>

        <p className="mt-1 text-xs text-gray-400">{company}</p>
      </div>

      <span
        className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${statusStyles[statusType]}`}
      >
        {status}
      </span>
    </div>
  );
}

/* Quick Action */

function QuickAction({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <button className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 text-left transition hover:border-gray-300 hover:shadow-sm">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 transition group-hover:bg-gray-200">
        {icon}
      </div>

      <div>
        <p className="text-sm font-medium">{title}</p>

        <p className="mt-1 text-xs text-gray-400">{description}</p>
      </div>
    </button>
  );
}