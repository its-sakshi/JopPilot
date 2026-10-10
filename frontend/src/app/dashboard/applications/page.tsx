"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  Clock3,
  MapPin,
  Plus,
  Search,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";

type ApplicationStatus =
  | "Applied"
  | "Screening"
  | "Interview"
  | "Offer"
  | "Rejected";

type Application = {
  id: number;
  company: string;
  role: string;
  location: string;
  salary: string;
  match: number;
  appliedDate: string;
  status: ApplicationStatus;
  interviewDate?: string;
  type: string;
};

const applications: Application[] = [
  {
    id: 1,
    company: "TechNova",
    role: "Full Stack Developer",
    location: "Bengaluru, India",
    salary: "₹8L – ₹14L",
    match: 94,
    appliedDate: "Sep 3, 2026",
    status: "Interview",
    interviewDate: "Sep 8, 2026",
    type: "Full-time",
  },
  {
    id: 2,
    company: "DataSphere",
    role: "Software Developer",
    location: "Noida, India",
    salary: "₹7L – ₹12L",
    match: 91,
    appliedDate: "Sep 2, 2026",
    status: "Screening",
    type: "Full-time",
  },
  {
    id: 3,
    company: "CloudMatrix",
    role: "Frontend Developer",
    location: "Remote",
    salary: "₹6L – ₹10L",
    match: 88,
    appliedDate: "Aug 30, 2026",
    status: "Applied",
    type: "Full-time",
  },
  {
    id: 4,
    company: "InnovateLabs",
    role: "Junior Full Stack Engineer",
    location: "Hyderabad, India",
    salary: "₹5L – ₹9L",
    match: 85,
    appliedDate: "Aug 28, 2026",
    status: "Applied",
    type: "Full-time",
  },
  {
    id: 5,
    company: "NextGen AI",
    role: "AI Application Developer",
    location: "Pune, India",
    salary: "₹8L – ₹15L",
    match: 82,
    appliedDate: "Aug 24, 2026",
    status: "Rejected",
    type: "Full-time",
  },
  {
    id: 6,
    company: "FinStack",
    role: "React Developer",
    location: "Gurugram, India",
    salary: "₹6L – ₹11L",
    match: 89,
    appliedDate: "Aug 22, 2026",
    status: "Offer",
    type: "Full-time",
  },
];

const statuses: ApplicationStatus[] = [
  "Applied",
  "Screening",
  "Interview",
  "Offer",
  "Rejected",
];

export default function ApplicationsPage() {
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState<"All" | ApplicationStatus>(
    "All"
  );

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const matchesSearch =
        application.company.toLowerCase().includes(search.toLowerCase()) ||
        application.role.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        activeStatus === "All" || application.status === activeStatus;

      return matchesSearch && matchesStatus;
    });
  }, [search, activeStatus]);

  const stats = {
    total: applications.length,
    active: applications.filter(
      (application) =>
        application.status !== "Rejected" &&
        application.status !== "Offer"
    ).length,
    interviews: applications.filter(
      (application) => application.status === "Interview"
    ).length,
    offers: applications.filter(
      (application) => application.status === "Offer"
    ).length,
  };

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
        {/* Heading */}
        <section className="mb-8">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600">
                <BriefcaseBusiness className="h-3.5 w-3.5" />
                Career pipeline
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Application Tracker
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
                Keep every job application organized and never lose track of
                your next opportunity.
              </p>
            </div>

            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#111111] px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800">
              <Plus className="h-4 w-4" />
              Add application
            </button>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <ApplicationStat
            label="Total applications"
            value={stats.total}
            icon={<BriefcaseBusiness className="h-4 w-4" />}
          />

          <ApplicationStat
            label="Active applications"
            value={stats.active}
            icon={<Clock3 className="h-4 w-4" />}
          />

          <ApplicationStat
            label="Interviews"
            value={stats.interviews}
            icon={<CalendarDays className="h-4 w-4" />}
          />

          <ApplicationStat
            label="Offers"
            value={stats.offers}
            icon={<Sparkles className="h-4 w-4" />}
          />
        </section>

        {/* Search + filters */}
        <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Search company or job title..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
              />
            </div>

            <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>

            <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
              Sort by
              <span className="font-semibold text-gray-900">Recent</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </section>

        {/* Status filters */}
        <div className="mb-7 flex gap-2 overflow-x-auto pb-1">
          <StatusFilter
            label="All"
            active={activeStatus === "All"}
            onClick={() => setActiveStatus("All")}
            count={applications.length}
          />

          {statuses.map((status) => (
            <StatusFilter
              key={status}
              label={status}
              active={activeStatus === status}
              onClick={() => setActiveStatus(status)}
              count={
                applications.filter(
                  (application) => application.status === status
                ).length
              }
            />
          ))}
        </div>

        {/* Pipeline */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Your applications</h2>
              <p className="mt-1 text-sm text-gray-500">
                {filteredApplications.length} application
                {filteredApplications.length !== 1 ? "s" : ""} shown
              </p>
            </div>

            <div className="hidden items-center gap-2 text-xs text-gray-500 sm:flex">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Updated automatically
            </div>
          </div>

          {activeStatus === "All" ? (
            <div className="grid gap-5 xl:grid-cols-5">
              {statuses.map((status) => (
                <PipelineColumn
                  key={status}
                  status={status}
                  applications={filteredApplications.filter(
                    (application) => application.status === status
                  )}
                />
              ))}
            </div>
          ) : (
            <div className="max-w-3xl">
              <div className="space-y-4">
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((application) => (
                    <ApplicationCard
                      key={application.id}
                      application={application}
                      expanded
                    />
                  ))
                ) : (
                  <EmptyState />
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function PipelineColumn({
  status,
  applications,
}: {
  status: ApplicationStatus;
  applications: Application[];
}) {
  return (
    <div className="min-w-0">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StatusDot status={status} />

          <h3 className="text-sm font-semibold">{status}</h3>
        </div>

        <span className="flex h-6 min-w-6 items-center justify-center rounded-md bg-gray-100 px-1.5 text-xs font-semibold text-gray-600">
          {applications.length}
        </span>
      </div>

      <div className="min-h-[180px] space-y-3 rounded-2xl border border-gray-200 bg-gray-100/60 p-2.5">
        {applications.length > 0 ? (
          applications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
            />
          ))
        ) : (
          <div className="flex min-h-[155px] items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white/50 p-4 text-center">
            <p className="text-xs text-gray-400">No applications</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ApplicationCard({
  application,
  expanded = false,
}: {
  application: Application;
  expanded?: boolean;
}) {
  return (
    <article
      className={`group rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-gray-300 hover:shadow-md ${
        expanded ? "sm:p-5" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-sm font-bold">
            {application.company.charAt(0)}
          </div>

          <div className="min-w-0">
            <h4 className="truncate text-sm font-semibold">
              {application.role}
            </h4>

            <p className="mt-0.5 truncate text-xs font-medium text-gray-500">
              {application.company}
            </p>
          </div>
        </div>

        <span className="shrink-0 rounded-full bg-gray-100 px-2 py-1 text-[10px] font-bold text-gray-700">
          {application.match}%
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{application.location}</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <CalendarDays className="h-3.5 w-3.5 shrink-0" />
          <span>Applied {application.appliedDate}</span>
        </div>

        {application.interviewDate && (
          <div className="flex items-center gap-2 text-xs font-medium text-gray-700">
            <Clock3 className="h-3.5 w-3.5 shrink-0" />
            <span>Interview {application.interviewDate}</span>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
        <span className="text-xs font-medium text-gray-600">
          {application.salary}
        </span>

        <button className="inline-flex items-center gap-1 text-xs font-semibold text-gray-700 opacity-0 transition group-hover:opacity-100">
          Details
          <ArrowUpRight className="h-3 w-3" />
        </button>
      </div>
    </article>
  );
}

function ApplicationStat({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
          {icon}
        </div>

        <span className="hidden text-xs font-medium text-green-600 sm:block">
          +12%
        </span>
      </div>

      <p className="mt-4 text-2xl font-bold tracking-tight">{value}</p>
      <p className="mt-1 text-xs text-gray-500 sm:text-sm">{label}</p>
    </div>
  );
}

function StatusFilter({
  label,
  active,
  onClick,
  count,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-medium transition ${
        active
          ? "bg-[#111111] text-white"
          : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
      }`}
    >
      {label}

      <span
        className={`rounded-md px-1.5 py-0.5 text-[10px] ${
          active
            ? "bg-white/15 text-white"
            : "bg-gray-100 text-gray-500"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function StatusDot({ status }: { status: ApplicationStatus }) {
  const dotClasses = {
    Applied: "bg-gray-400",
    Screening: "bg-blue-500",
    Interview: "bg-purple-500",
    Offer: "bg-green-500",
    Rejected: "bg-red-500",
  };

  return (
    <span
      className={`h-2 w-2 rounded-full ${dotClasses[status]}`}
    />
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
      <BriefcaseBusiness className="mx-auto h-8 w-8 text-gray-400" />

      <h3 className="mt-4 font-semibold">No applications found</h3>

      <p className="mt-1 text-sm text-gray-500">
        Try changing your search or status filter.
      </p>
    </div>
  );
}