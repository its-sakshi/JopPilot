"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Bookmark,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Clock3,
  MapPin,
  Search,
  Sparkles,
  X,
} from "lucide-react";

type Job = {
  id: number;
  company: string;
  role: string;
  location: string;
  type: string;
  posted: string;
  salary: string;
  match: number;
  skills: string[];
  missing: string[];
  description: string;
  recommended: boolean;
};

const jobs: Job[] = [
  {
    id: 1,
    company: "TechNova",
    role: "Full Stack Developer",
    location: "Bengaluru, India",
    type: "Full-time",
    posted: "2 days ago",
    salary: "₹8L – ₹14L",
    match: 94,
    skills: ["React", "Next.js", "TypeScript", "Node.js", "REST APIs"],
    missing: ["Docker"],
    description:
      "Build scalable web applications and work closely with product and engineering teams.",
    recommended: true,
  },
  {
    id: 2,
    company: "DataSphere",
    role: "Software Developer",
    location: "Noida, India",
    type: "Full-time",
    posted: "1 day ago",
    salary: "₹7L – ₹12L",
    match: 91,
    skills: ["Python", "React", "SQL", "Git", "REST APIs"],
    missing: ["AWS", "Redis"],
    description:
      "Develop modern software solutions and integrate APIs for data-driven products.",
    recommended: true,
  },
  {
    id: 3,
    company: "CloudMatrix",
    role: "Frontend Developer",
    location: "Remote",
    type: "Full-time",
    posted: "3 days ago",
    salary: "₹6L – ₹10L",
    match: 88,
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    missing: ["Testing", "CI/CD"],
    description:
      "Create responsive, accessible and high-performance interfaces for SaaS products.",
    recommended: true,
  },
  {
    id: 4,
    company: "InnovateLabs",
    role: "Junior Full Stack Engineer",
    location: "Hyderabad, India",
    type: "Full-time",
    posted: "5 days ago",
    salary: "₹5L – ₹9L",
    match: 85,
    skills: ["JavaScript", "React", "Node.js", "MongoDB"],
    missing: ["Docker", "AWS"],
    description:
      "Join a growing engineering team building customer-facing digital products.",
    recommended: false,
  },
  {
    id: 5,
    company: "NextGen AI",
    role: "AI Application Developer",
    location: "Pune, India",
    type: "Full-time",
    posted: "1 week ago",
    salary: "₹8L – ₹15L",
    match: 82,
    skills: ["Python", "React", "REST APIs", "AI/ML"],
    missing: ["FastAPI", "Docker"],
    description:
      "Build AI-powered applications and integrate modern machine learning services.",
    recommended: false,
  },
];

const filters = ["All Jobs", "Recommended", "Remote", "Full-time"];

export default function JobsPage() {
  const [activeFilter, setActiveFilter] = useState("All Jobs");
  const [search, setSearch] = useState("");
  const [savedJobs, setSavedJobs] = useState<number[]>([]);

  const toggleSaved = (id: number) => {
    setSavedJobs((current) =>
      current.includes(id)
        ? current.filter((jobId) => jobId !== id)
        : [...current, id]
    );
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.role.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(search.toLowerCase())
      );

    const matchesFilter =
      activeFilter === "All Jobs"
        ? true
        : activeFilter === "Recommended"
        ? job.recommended
        : activeFilter === "Remote"
        ? job.location === "Remote"
        : job.type === "Full-time";

    return matchesSearch && matchesFilter;
  });

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#111111]">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </Link>

            <div className="hidden items-center gap-2 sm:flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#111111] text-sm font-bold text-white">
                J
              </div>
              <span className="text-sm font-semibold">JobPilot</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page heading */}
        <section className="mb-8">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600">
                <Sparkles className="h-3.5 w-3.5" />
                AI-powered recommendations
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Job Matches
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
                Discover opportunities that match your resume, skills, and
                career goals.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50">
                <Sparkles className="h-4 w-4 text-green-600" />
              </div>

              <div>
                <p className="text-xs text-gray-500">Profile strength</p>
                <p className="text-sm font-semibold">87/100</p>
              </div>
            </div>
          </div>
        </section>

        {/* Search */}
        <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Search jobs, companies, or skills..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
              />
            </div>

            <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
              <BriefcaseBusiness className="h-4 w-4" />
              Job type
              <ChevronDown className="h-4 w-4" />
            </button>

            <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
              <MapPin className="h-4 w-4" />
              Location
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </section>

        {/* Filters */}
        <div className="mb-7 flex gap-2 overflow-x-auto pb-1">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition ${
                activeFilter === filter
                  ? "bg-[#111111] text-white"
                  : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Jobs */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Recommended for you</h2>
                <p className="mt-1 text-sm text-gray-500">
                  {filteredJobs.length} opportunities found
                </p>
              </div>

              <button className="hidden items-center gap-2 text-sm font-medium text-gray-600 sm:flex">
                Sort by
                <span className="font-semibold text-gray-900">Best match</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    saved={savedJobs.includes(job.id)}
                    onSave={() => toggleSaved(job.id)}
                  />
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
                  <Search className="mx-auto h-8 w-8 text-gray-400" />
                  <h3 className="mt-4 font-semibold">No jobs found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try changing your search or filters.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Sidebar */}
          <aside className="space-y-5">
            {/* Match profile */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Your match profile</h3>
                <Sparkles className="h-4 w-4 text-gray-400" />
              </div>

              <div className="mt-6 flex items-center justify-center">
                <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-[10px] border-gray-100">
                  <div className="absolute inset-[-10px] rounded-full border-[10px] border-transparent border-t-[#111111] border-r-[#111111] rotate-12" />

                  <div className="text-center">
                    <p className="text-3xl font-bold">92%</p>
                    <p className="text-xs text-gray-500">Average match</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <MatchProgress
                  label="Technical skills"
                  value={94}
                />
                <MatchProgress
                  label="Experience"
                  value={89}
                />
                <MatchProgress
                  label="Keywords"
                  value={92}
                />
                <MatchProgress
                  label="Education"
                  value={96}
                />
              </div>
            </div>

            {/* Improve match */}
            <div className="rounded-2xl border border-gray-200 bg-[#111111] p-5 text-white">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                <Sparkles className="h-4 w-4" />
              </div>

              <h3 className="mt-4 font-semibold">Improve your matches</h3>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                Add more skills to your profile to unlock better job
                recommendations.
              </p>

              <div className="mt-5 space-y-3">
                <MissingSkill skill="Docker" />
                <MissingSkill skill="AWS" />
                <MissingSkill skill="CI/CD" />
              </div>

              <Link
                href="/dashboard/resume"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#111111] transition hover:bg-gray-100"
              >
                Analyze resume
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function JobCard({
  job,
  saved,
  onSave,
}: {
  job: Job;
  saved: boolean;
  onSave: () => void;
}) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-gray-300 hover:shadow-md sm:p-6">
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-lg font-bold">
              {job.company.charAt(0)}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold">{job.role}</h3>

                {job.recommended && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-[10px] font-semibold text-gray-700">
                    <Sparkles className="h-3 w-3" />
                    AI Pick
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm font-medium text-gray-600">
                {job.company}
              </p>

              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {job.location}
                </span>

                <span className="inline-flex items-center gap-1">
                  <BriefcaseBusiness className="h-3.5 w-3.5" />
                  {job.type}
                </span>

                <span className="inline-flex items-center gap-1">
                  <Clock3 className="h-3.5 w-3.5" />
                  {job.posted}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onSave}
            aria-label="Save job"
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition ${
              saved
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-200 text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Bookmark className="h-4 w-4" fill={saved ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="grid gap-4 border-y border-gray-100 py-4 sm:grid-cols-[1fr_auto]">
          <div>
            <p className="text-sm leading-6 text-gray-600">
              {job.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-medium text-gray-700"
                >
                  <Check className="h-3 w-3 text-green-600" />
                  {skill}
                </span>
              ))}

              {job.missing.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 rounded-md border border-red-100 bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-600"
                >
                  <X className="h-3 w-3" />
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center sm:justify-end">
            <div className="text-left sm:text-right">
              <p className="text-3xl font-bold tracking-tight">
                {job.match}%
              </p>
              <p className="text-xs text-gray-500">match</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold">{job.salary}</p>
            <p className="mt-1 text-xs text-gray-500">
              Based on your profile and experience
            </p>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:flex-none">
              View details
            </button>

            <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#111111] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 sm:flex-none">
              Apply
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function MatchProgress({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs font-medium text-gray-600">{label}</span>
        <span className="text-xs font-semibold">{value}%</span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-[#111111]"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function MissingSkill({ skill }: { skill: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-gray-300">{skill}</span>
      <span className="text-xs text-gray-500">Missing</span>
    </div>
  );
}