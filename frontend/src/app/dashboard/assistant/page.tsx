"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bot,
  BriefcaseBusiness,
  ChevronRight,
  FileText,
  Lightbulb,
  MessageCircle,
  Plus,
  Send,
  Sparkles,
  Trash2,
  User,
} from "lucide-react";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const suggestedPrompts = [
  {
    icon: FileText,
    title: "Improve my resume",
    prompt: "How can I improve my resume to get more interviews?",
  },
  {
    icon: BriefcaseBusiness,
    title: "Find suitable jobs",
    prompt: "What type of jobs should I apply for based on my skills?",
  },
  {
    icon: Lightbulb,
    title: "Identify skill gaps",
    prompt: "What skills should I learn to become a stronger Full Stack Developer?",
  },
  {
    icon: MessageCircle,
    title: "Prepare for interview",
    prompt: "Help me prepare for a Full Stack Developer interview.",
  },
];

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hi! I'm your JobPilot AI career assistant. I can help you improve your resume, identify skill gaps, prepare for interviews, and make smarter job-search decisions. What would you like to work on?",
  },
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = (messageText?: string) => {
    const text = (messageText ?? input).trim();

    if (!text || isTyping) {
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: text,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = generateMockResponse(text);

      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: response,
      };

      setMessages((current) => [...current, assistantMessage]);
      setIsTyping(false);
    }, 900);
  };

  const clearChat = () => {
    setMessages(initialMessages);
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#FAFAFA] text-[#111111]">
      {/* Header */}
      <header className="shrink-0 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>

          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#111111] text-sm font-bold text-white">
              J
            </div>

            <span className="text-sm font-semibold">JobPilot</span>
          </div>

          <button
            onClick={clearChat}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Clear chat</span>
          </button>
        </div>
      </header>

      {/* Chat area */}
      <div className="flex flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 sm:px-6">
          {/* Heading */}
          <div className="py-8 text-center sm:py-10">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#111111] text-white shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>

            <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
              AI Career Assistant
            </h1>

            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-gray-500">
              Get personalized guidance for your resume, job search, skills,
              and interviews.
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-6 pb-6">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {isTyping && <TypingIndicator />}
          </div>

          {/* Suggested prompts */}
          {messages.length === 1 && (
            <section className="pb-6">
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                <Sparkles className="h-3.5 w-3.5" />
                Try asking
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {suggestedPrompts.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.title}
                      onClick={() => sendMessage(item.prompt)}
                      className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm transition hover:border-gray-300 hover:shadow-md"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                        <Icon className="h-4 w-4 text-gray-600" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold">
                          {item.title}
                        </p>

                        <p className="mt-0.5 truncate text-xs text-gray-500">
                          {item.prompt}
                        </p>
                      </div>

                      <ChevronRight className="h-4 w-4 shrink-0 text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-gray-700" />
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {/* Input */}
          <div className="sticky bottom-0 bg-[#FAFAFA] pb-5 pt-2 sm:pb-7">
            <div className="rounded-2xl border border-gray-200 bg-white p-2 shadow-sm focus-within:border-gray-400">
              <div className="flex items-end gap-2">
                <button
                  className="mb-1 ml-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                  aria-label="New conversation"
                  onClick={clearChat}
                >
                  <Plus className="h-5 w-5" />
                </button>

                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Ask anything about your career..."
                  rows={1}
                  className="max-h-32 min-h-10 flex-1 resize-none border-0 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-gray-400"
                />

                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isTyping}
                  className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#111111] text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>

            <p className="mt-2 text-center text-[11px] text-gray-400">
              JobPilot AI can make mistakes. Verify important career
              information before acting on it.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#111111] text-white">
          <Bot className="h-4 w-4" />
        </div>
      )}

      <div
        className={`max-w-2xl ${
          isUser
            ? "rounded-2xl rounded-br-md bg-[#111111] px-4 py-3 text-white"
            : "rounded-2xl rounded-bl-md border border-gray-200 bg-white px-4 py-3 shadow-sm"
        }`}
      >
        <div className="mb-1 flex items-center gap-2">
          {isUser ? (
            <>
              <span className="text-xs font-semibold text-white/70">
                You
              </span>
              <User className="h-3 w-3 text-white/50" />
            </>
          ) : (
            <>
              <span className="text-xs font-semibold text-gray-500">
                JobPilot AI
              </span>
              <Sparkles className="h-3 w-3 text-gray-400" />
            </>
          )}
        </div>

        <p
          className={`whitespace-pre-line text-sm leading-6 ${
            isUser ? "text-white" : "text-gray-700"
          }`}
        >
          {message.content}
        </p>
      </div>

      {isUser && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white">
          <User className="h-4 w-4 text-gray-500" />
        </div>
      )}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#111111] text-white">
        <Bot className="h-4 w-4" />
      </div>

      <div className="rounded-2xl rounded-bl-md border border-gray-200 bg-white px-5 py-4 shadow-sm">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" />
        </div>
      </div>
    </div>
  );
}

function generateMockResponse(input: string) {
  const message = input.toLowerCase();

  if (
    message.includes("resume") ||
    message.includes("cv") ||
    message.includes("improve")
  ) {
    return `Your resume already has a strong technical foundation. Based on your current profile, I'd focus on three improvements:

1. Add measurable results to your project descriptions.
2. Strengthen your professional summary with the exact roles you're targeting.
3. Add relevant keywords such as Docker, AWS, CI/CD, and Redis where they genuinely match your experience.

Your current JobPilot resume score is 87/100, so these changes could help push your profile higher.`;
  }

  if (
    message.includes("skill") ||
    message.includes("learn") ||
    message.includes("skill gap")
  ) {
    return `For a Full Stack Developer role, I'd prioritize your next skills in this order:

1. Docker — learn containerization and Docker Compose.
2. AWS — focus on EC2, S3, RDS, and basic deployment.
3. Redis — understand caching and session management.
4. CI/CD — learn GitHub Actions and automated deployments.
5. System Design — practice APIs, databases, caching, and scalability.

You don't need to master everything at once. Start with Docker and deployment because they can make your existing projects much stronger.`;
  }

  if (
    message.includes("interview") ||
    message.includes("prepare")
  ) {
    return `For a Full Stack Developer interview, I'd prepare across four areas:

• JavaScript/TypeScript fundamentals
• React and Next.js architecture
• Node.js, REST APIs, databases, and authentication
• DSA and basic system design

I'd also prepare a 2-minute explanation of your JobPilot project covering the problem, architecture, technologies, key challenges, and what you personally implemented.

A strong project explanation can make a big difference in the technical interview.`;
  }

  if (
    message.includes("job") ||
    message.includes("apply") ||
    message.includes("career")
  ) {
    return `Based on your current profile, Full Stack Developer, Software Developer, Frontend Developer, and AI Application Developer roles are worth targeting.

Your strongest matches are currently around React, Next.js, TypeScript, Python, SQL, REST APIs, and Node.js.

I'd prioritize jobs with a match score above 85%, then spend time improving the missing skills shown in each job listing rather than applying randomly to hundreds of positions.`;
  }

  return `That's a great question. Based on your current JobPilot profile, I'd approach it strategically rather than trying to do everything at once.

Your strongest areas currently include React, Next.js, TypeScript, Python, SQL, REST APIs, and Git.

If you're targeting Full Stack Developer roles, I'd recommend focusing next on real-world backend development, deployment, databases, testing, and system design.

You can also ask me to review your resume, identify skill gaps, prepare interview questions, or help decide which jobs you should apply to.`;
}