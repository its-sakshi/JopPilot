"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  Lightbulb,
  Search,
  Sparkles,
  Target,
  Upload,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

type Recommendation = {
  title: string;
  description: string;
};

type ResumeAnalysis = {
  atsScore: number;
  breakdown: {
    keywords: number;
    formatting: number;
    skills: number;
    contentQuality: number;
  };
  detectedSkills: string[];
  missingKeywords: string[];
  sections: string[];
  contactInformation: {
    email: boolean;
    phone: boolean;
    linkedin: boolean;
    github: boolean;
  };
  recommendations: Recommendation[];
};

export default function ResumePage() {
  const [uploaded, setUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [error, setError] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobMatch, setJobMatch] = useState<any>(null);
  const [matchingJob, setMatchingJob] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");
    setAnalysis(null);

    // Validate file type
    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file only.");
      event.target.value = "";
      return;
    }

    // Validate file size
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError("File size must be 5 MB or less.");
      event.target.value = "";
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();

      formData.append("resume", file);

      // Upload resume
      const response = await fetch(
        "http://localhost:5000/api/resume/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to upload resume.");
      }

      setUploaded(true);
      setFileName(data.fileName);
      setFileSize(data.fileSize);
      setResumeText(data.resumeText);

      // Analyze extracted resume
      setAnalyzing(true);

      try {
        const analysisResponse = await fetch(
          "http://localhost:5000/api/analyze/resume",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              resumeText: data.resumeText,
            }),
          }
        );

        const analysisData = await analysisResponse.json();

        if (!analysisResponse.ok || !analysisData.success) {
          throw new Error(
            analysisData.message || "Failed to analyze resume."
          );
        }

        setAnalysis(analysisData.analysis);
      } catch (analysisError) {
        console.error("Resume analysis error:", analysisError);

        if (analysisError instanceof Error) {
          setError(analysisError.message);
        } else {
          setError("Failed to analyze resume.");
        }
      } finally {
        setAnalyzing(false);
      }
    } catch (error) {
      console.error("Resume upload error:", error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong while uploading your resume.");
      }

      setUploaded(false);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleJobMatch = async () => {
  if (!resumeText) {
    setError("Please upload your resume first.");
    return;
  }

  if (!jobDescription.trim()) {
    setError("Please paste a job description first.");
    return;
  }

  if (jobDescription.trim().length < 50) {
    setError("Job description is too short. Please provide more details.");
    return;
  }

  setError("");
  setMatchingJob(true);
  setJobMatch(null);

  try {
    const response = await fetch(
      "http://localhost:5000/api/analyze/job-match",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText,
          jobDescription,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message || "Failed to analyze job match."
      );
    }

    setJobMatch(data.match);
  } catch (error) {
    console.error("Job match error:", error);

    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError("Failed to analyze job match.");
    }
  } finally {
    setMatchingJob(false);
  }
};

  const handleRemoveResume = () => {
    setUploaded(false);
    setFileName("");
    setFileSize(0);
    setResumeText("");
    setAnalysis(null);
    setError("");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(0)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatSkillName = (skill: string) => {
    const skillNames: Record<string, string> = {
      python: "Python",
      javascript: "JavaScript",
      typescript: "TypeScript",
      java: "Java",
      c: "C",
      "c++": "C++",
      react: "React",
      "react.js": "React.js",
      "next.js": "Next.js",
      "node.js": "Node.js",
      node: "Node.js",
      express: "Express",
      flask: "Flask",
      django: "Django",
      html: "HTML",
      html5: "HTML5",
      css: "CSS",
      css3: "CSS3",
      tailwind: "Tailwind CSS",
      bootstrap: "Bootstrap",
      "rest api": "REST API",
      "restful api": "RESTful API",
      "api integration": "API Integration",
      sql: "SQL",
      mysql: "MySQL",
      postgresql: "PostgreSQL",
      mongodb: "MongoDB",
      redis: "Redis",
      docker: "Docker",
      aws: "AWS",
      azure: "Azure",
      git: "Git",
      github: "GitHub",
      linux: "Linux",
      "machine learning": "Machine Learning",
      "deep learning": "Deep Learning",
      tensorflow: "TensorFlow",
      pytorch: "PyTorch",
      "scikit-learn": "Scikit-learn",
      sklearn: "Scikit-learn",
      nlp: "NLP",
      "computer vision": "Computer Vision",
      "generative ai": "Generative AI",
      llm: "LLM",
      llms: "LLMs",
      "prompt engineering": "Prompt Engineering",
      openai: "OpenAI",
      "data analysis": "Data Analysis",
      pandas: "Pandas",
      numpy: "NumPy",
      "power bi": "Power BI",
      excel: "Excel",
      graphql: "GraphQL",
      websocket: "WebSocket",
      "ci/cd": "CI/CD",
      kubernetes: "Kubernetes",
    };

    return skillNames[skill.toLowerCase()] || skill;
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#111111]">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-gray-500 transition hover:bg-gray-100 hover:text-black"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>

            <div className="h-5 w-px bg-gray-200" />

            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#111111]">
                <FileText className="h-4 w-4 text-white" />
              </div>

              <span className="text-lg font-semibold tracking-tight">
                JobPilot
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-500 transition hover:bg-gray-100 hover:text-black sm:flex">
              <Search className="h-4 w-4" />
              Search
            </button>

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
              <span className="text-xs font-medium text-gray-600">YN</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#635BFF]" />

            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              AI Resume Analyzer
            </span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Optimize your resume
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
            Upload your resume and get an AI-powered analysis of your ATS
            score, keywords, skills, formatting, and overall job readiness.
          </p>
        </motion.div>

        {/* Upload Section */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="rounded-xl border border-gray-200 bg-white"
        >
          <div className="border-b border-gray-100 px-5 py-4">
            <h2 className="text-sm font-semibold">Resume</h2>

            <p className="mt-1 text-xs text-gray-400">
              Upload your latest resume in PDF format.
            </p>
          </div>

          <div className="p-5">
            {!uploaded ? (
              <button
                type="button"
                onClick={handleChooseFile}
                disabled={uploading}
                className="group flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-[#FAFAFA] px-6 py-14 text-center transition hover:border-gray-400 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-gray-100 transition group-hover:scale-105">
                  {uploading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-[#111111]" />
                  ) : (
                    <Upload className="h-5 w-5 text-gray-600" />
                  )}
                </div>

                <p className="mt-4 text-sm font-semibold">
                  {uploading
                    ? "Uploading your resume..."
                    : "Upload your resume"}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {uploading
                    ? "Please wait while JobPilot processes your PDF"
                    : "Drag & drop your PDF here or click to browse"}
                </p>

                {!uploading && (
                  <span className="mt-4 rounded-lg bg-[#111111] px-4 py-2 text-xs font-medium text-white">
                    Choose PDF
                  </span>
                )}

                <p className="mt-4 text-[11px] text-gray-400">
                  Maximum file size: 5 MB
                </p>
              </button>
            ) : (
              <div className="rounded-xl border border-gray-200 bg-[#FAFAFA] p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                    <FileText className="h-5 w-5 text-gray-600" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {fileName}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      PDF · {formatFileSize(fileSize)} · Uploaded just now
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleRemoveResume}
                    className="rounded-lg p-2 text-gray-400 transition hover:bg-white hover:text-gray-700"
                    aria-label="Remove resume"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-4 flex flex-col justify-between gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:items-center">
                  <span className="flex items-center gap-2 text-xs text-green-600">
                    <CheckCircle2 className="h-4 w-4" />
                    Resume ready for analysis
                  </span>

                  <button
                    type="button"
                    onClick={handleChooseFile}
                    className="text-left text-xs font-medium text-gray-500 hover:text-black sm:text-right"
                  >
                    Replace resume
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-xs font-medium text-red-600">{error}</p>
              </div>
            )}

            {analyzing && (
              <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-[#111111]" />

                  <div>
                    <p className="text-xs font-semibold">
                      Analyzing your resume...
                    </p>

                    <p className="mt-1 text-[11px] text-gray-400">
                      JobPilot is evaluating your resume structure, skills,
                      keywords, and content.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {uploaded && resumeText && (
              <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold">
                    Resume text extracted
                  </p>

                  <span className="text-[11px] text-gray-400">
                    {resumeText.length.toLocaleString()} characters
                  </span>
                </div>

                <div className="mt-3 max-h-32 overflow-y-auto rounded-lg bg-[#FAFAFA] p-3">
                  <p className="whitespace-pre-wrap text-xs leading-5 text-gray-500">
                    {resumeText}
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.section>

        {/* Analysis */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* ATS Score */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-xl border border-gray-200 bg-white lg:col-span-1"
          >
            <div className="border-b border-gray-100 px-5 py-4">
              <h2 className="text-sm font-semibold">ATS score</h2>

              <p className="mt-1 text-xs text-gray-400">
                Overall resume compatibility
              </p>
            </div>

            <div className="flex flex-col items-center p-6">
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[12px] border-gray-100">
                <div className="absolute inset-[-12px] rotate-[20deg] rounded-full border-[12px] border-transparent border-r-[#111111] border-t-[#111111]" />

                <div className="text-center">
                  <p className="text-4xl font-semibold">
                    {analysis?.atsScore ?? 0}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">out of 100</p>
                </div>
              </div>

              <div className="mt-5 text-center">
                <p className="text-sm font-semibold">
                  {analysis
                    ? analysis.atsScore >= 90
                      ? "Excellent score"
                      : analysis.atsScore >= 75
                      ? "Good score"
                      : analysis.atsScore >= 60
                      ? "Needs improvement"
                      : "Needs significant improvement"
                    : "Upload your resume"}
                </p>

                <p className="mt-1 max-w-xs text-xs leading-5 text-gray-500">
                  {analysis
                    ? "Your score is based on keywords, formatting, skills, and content quality."
                    : "Upload a PDF resume to receive your personalized ATS analysis."}
                </p>
              </div>

              <div className="mt-5 flex w-full items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                <span className="text-xs text-gray-500">
                  Target score
                </span>

                <span className="text-sm font-semibold">95+</span>
              </div>
            </div>
          </motion.section>

          {/* Score Breakdown */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="rounded-xl border border-gray-200 bg-white lg:col-span-2"
          >
            <div className="border-b border-gray-100 px-5 py-4">
              <h2 className="text-sm font-semibold">Score breakdown</h2>

              <p className="mt-1 text-xs text-gray-400">
                How your resume performs across key areas
              </p>
            </div>

            <div className="space-y-6 p-5">
              <ScoreRow
                icon={<Target className="h-4 w-4" />}
                title="Keywords"
                description="Relevant keywords found in your resume"
                score={analysis?.breakdown.keywords ?? 0}
                percentage={analysis?.breakdown.keywords ?? 0}
              />

              <ScoreRow
                icon={<FileText className="h-4 w-4" />}
                title="Formatting"
                description="Structure, readability and ATS-friendly formatting"
                score={analysis?.breakdown.formatting ?? 0}
                percentage={analysis?.breakdown.formatting ?? 0}
              />

              <ScoreRow
                icon={<CheckCircle2 className="h-4 w-4" />}
                title="Skills"
                description="Technical and professional skills detected"
                score={analysis?.breakdown.skills ?? 0}
                percentage={analysis?.breakdown.skills ?? 0}
              />

              <ScoreRow
                icon={<Lightbulb className="h-4 w-4" />}
                title="Content quality"
                description="Clarity, impact and strength of your resume content"
                score={analysis?.breakdown.contentQuality ?? 0}
                percentage={analysis?.breakdown.contentQuality ?? 0}
              />
            </div>
          </motion.section>
        </div>

        {/* Keywords + Skills */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Keywords */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-xl border border-gray-200 bg-white"
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <div>
                <h2 className="text-sm font-semibold">Keyword analysis</h2>

                <p className="mt-1 text-xs text-gray-400">
                  Important terms detected in your resume
                </p>
              </div>

              <span className="text-xs font-medium text-gray-500">
                {analysis?.detectedSkills.length ?? 0} detected
              </span>
            </div>

            <div className="p-5">
              {analysis ? (
                <>
                  <div className="flex flex-wrap gap-2">
                    {analysis.detectedSkills.length > 0 ? (
                      analysis.detectedSkills.map((skill) => (
                        <Keyword
                          key={skill}
                          text={formatSkillName(skill)}
                        />
                      ))
                    ) : (
                      <p className="text-xs text-gray-400">
                        No technical keywords detected.
                      </p>
                    )}
                  </div>

                  <div className="mt-5 rounded-lg border border-gray-200 bg-[#FAFAFA] p-4">
                    <p className="text-xs font-semibold">
                      Missing keywords
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {analysis.missingKeywords.length > 0 ? (
                        analysis.missingKeywords.map((keyword) => (
                          <span
                            key={keyword}
                            className="rounded-md bg-white px-2.5 py-1.5 text-xs text-gray-600 ring-1 ring-gray-200"
                          >
                            {keyword}
                          </span>
                        ))
                      ) : (
                        <p className="text-xs text-green-600">
                          No recommended keywords are missing.
                        </p>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-xs text-gray-400">
                  Upload your resume to detect relevant keywords.
                </p>
              )}
            </div>
          </motion.section>

          {/* Skills */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="rounded-xl border border-gray-200 bg-white"
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <div>
                <h2 className="text-sm font-semibold">Skills detected</h2>

                <p className="mt-1 text-xs text-gray-400">
                  Skills identified from your resume
                </p>
              </div>

              <span className="text-xs font-medium text-gray-500">
                {analysis?.detectedSkills.length ?? 0} skills
              </span>
            </div>

            <div className="p-5">
              {analysis ? (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {analysis.detectedSkills.length > 0 ? (
                    analysis.detectedSkills.map((skill) => (
                      <Skill
                        key={skill}
                        text={formatSkillName(skill)}
                      />
                    ))
                  ) : (
                    <p className="col-span-full text-xs text-gray-400">
                      No skills detected.
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-xs text-gray-400">
                  Upload your resume to detect your technical skills.
                </p>
              )}
            </div>
          </motion.section>
        </div>

        {/* AI Recommendations */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-6 rounded-xl border border-gray-200 bg-white"
        >
          <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
              <Sparkles className="h-4 w-4" />
            </div>

            <div>
              <h2 className="text-sm font-semibold">
                AI recommendations
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Personalized suggestions to improve your resume
              </p>
            </div>
          </div>

          <div className="grid gap-4 p-5 md:grid-cols-3">
            {analysis?.recommendations?.length ? (
              analysis.recommendations
                .slice(0, 3)
                .map((recommendation, index) => (
                  <Recommendation
                    key={`${recommendation.title}-${index}`}
                    number={String(index + 1).padStart(2, "0")}
                    title={recommendation.title}
                    description={recommendation.description}
                  />
                ))
            ) : (
              <p className="text-xs text-gray-400">
                Upload your resume to receive personalized recommendations.
              </p>
            )}
          </div>
        </motion.section>

        {/* Job Description */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="mt-6 rounded-xl border border-gray-200 bg-white"
        >
          <div className="border-b border-gray-100 px-5 py-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-gray-500" />

              <h2 className="text-sm font-semibold">
                Compare with a job description
              </h2>
            </div>

            <p className="mt-1 text-xs text-gray-400">
              Paste a job description to see how well your resume matches the
              role.
            </p>
          </div>

          <div className="p-5">
            <textarea
              placeholder="Paste the job description here..."
              rows={7}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full resize-none rounded-lg border border-gray-200 bg-[#FAFAFA] p-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
            />

            <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <p className="text-xs text-gray-400">
                JobPilot will compare required skills, keywords and
                qualifications.
              </p>

              <button 
              type="button"
              onClick={handleJobMatch}
              disabled={matchingJob}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#111111] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-black">
                {matchingJob ? "Analyzing..." : "Analyze job match"}

                {matchingJob ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-white" />
                ) : (
                <ArrowRight className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </motion.section>

        {/* Job Match Results */}
        {jobMatch && (
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6 rounded-xl border border-gray-200 bg-white"
          >
            <div className="border-b border-gray-100 px-5 py-4">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-gray-500" />

                <div>
                  <h2 className="text-sm font-semibold">
                    Job match results
                  </h2>

                  <p className="mt-1 text-xs text-gray-400">
                    How well your resume matches this job description
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5">
              {/* Match Score */}
              <div className="flex flex-col items-center rounded-xl bg-[#FAFAFA] p-6 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  Match score
                </p>

                <p className="mt-2 text-5xl font-semibold tracking-tight">
                  {jobMatch.matchScore}%
                </p>

                <p className="mt-2 text-xs text-gray-500">
                  {jobMatch.matchScore >= 80
                    ? "Strong match for this role"
                    : jobMatch.matchScore >= 60
                    ? "Moderate match — some improvements recommended"
                    : "Low match — consider tailoring your resume"}
                </p>
              </div>

              {/* Matched + Missing Keywords */}
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {/* Matched Keywords */}
                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold">
                      Matched keywords
                    </h3>

                    <span className="text-xs text-green-600">
                      {jobMatch.matchedCount} matched
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {jobMatch.matchedKeywords.length > 0 ? (
                      jobMatch.matchedKeywords.map((keyword: string) => (
                        <span
                          key={keyword}
                          className="rounded-md bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-700"
                        >
                          {keyword}
                        </span>
                      ))
                    ) : (
                      <p className="text-xs text-gray-400">
                        No matching keywords found.
                      </p>
                    )}
                  </div>
                </div>

                {/* Missing Keywords */}
                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold">
                      Missing keywords
                    </h3>

                    <span className="text-xs text-gray-500">
                      {jobMatch.missingCount} missing
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {jobMatch.missingKeywords.length > 0 ? (
                      jobMatch.missingKeywords.map((keyword: string) => (
                        <span
                          key={keyword}
                          className="rounded-md bg-white px-2.5 py-1.5 text-xs text-gray-600 ring-1 ring-gray-200"
                        >
                          {keyword}
                        </span>
                      ))
                    ) : (
                      <p className="text-xs text-green-600">
                        No important keywords are missing.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="mt-5">
                <h3 className="text-xs font-semibold">
                  Recommendations
                </h3>

                <div className="mt-3 grid gap-4 md:grid-cols-2">
                  {jobMatch.recommendations.map(
                    (
                      recommendation: {
                        title: string;
                        description: string;
                      },
                      index: number
                    ) => (
                      <div
                        key={`${recommendation.title}-${index}`}
                        className="rounded-lg border border-gray-200 p-4"
                      >
                        <span className="text-[10px] font-semibold text-gray-400">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <h4 className="mt-2 text-sm font-semibold">
                          {recommendation.title}
                        </h4>

                        <p className="mt-2 text-xs leading-5 text-gray-500">
                          {recommendation.description}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Bottom CTA */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-black"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}

/* Score Row */

function ScoreRow({
  icon,
  title,
  description,
  score,
  percentage,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  score: number;
  percentage: number;
}) {
  return (
    <div>
      <div className="mb-2 flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-medium">{title}</p>

            <span className="text-sm font-semibold">{score}</span>
          </div>

          <p className="mt-1 text-xs text-gray-400">{description}</p>
        </div>
      </div>

      <div className="ml-11 h-1.5 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-[#111111] transition-all duration-700"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

/* Keyword */

function Keyword({ text }: { text: string }) {
  return (
    <span className="rounded-md bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-700">
      {text}
    </span>
  );
}

/* Skill */

function Skill({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5">
      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-gray-500" />

      <span className="truncate text-xs font-medium text-gray-700">
        {text}
      </span>
    </div>
  );
}

/* Recommendation */

function Recommendation({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <span className="text-[10px] font-semibold text-gray-400">
        {number}
      </span>

      <h3 className="mt-3 text-sm font-semibold">{title}</h3>

      <p className="mt-2 text-xs leading-5 text-gray-500">
        {description}
      </p>
    </div>
  );
}